package mu.muse.application.muse

import io.jsonwebtoken.JwtParser
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.security.Keys
import jakarta.servlet.http.HttpServletResponse
import mu.muse.rest.API_COUNTRIES
import mu.muse.rest.API_FAVORITE_ADD
import mu.muse.rest.API_FAVORITE_LIST
import mu.muse.rest.API_FAVORITE_REMOVE
import mu.muse.rest.API_MANUFACTURERS
import mu.muse.rest.API_INSTRUMENTS
import mu.muse.rest.API_INSTRUMENTS_PAGINATED
import mu.muse.rest.API_INSTRUMENT_BY_ID
import mu.muse.rest.API_INSTRUMENT_MATERIALS
import mu.muse.rest.API_INSTRUMENT_TYPES
import mu.muse.rest.API_REGISTRATION
import mu.muse.rest.AUTH_BASIC_LOGIN
import mu.muse.usecase.access.user.UserExtractor
import mu.muse.usecase.scenario.login.BasicLoginUseCase
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.core.session.SessionRegistry
import org.springframework.security.core.session.SessionRegistryImpl
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import java.security.Key

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true, jsr250Enabled = true)
@Suppress("TooManyFunctions")
class SecurityConfiguration {

    @Bean
    fun jwtSecretKey(@Value("\${security.jwt.secret-key}") jwtSecretKey: String): Key =
        Keys.hmacShaKeyFor(jwtSecretKey.toByteArray())

    @Bean
    fun jwtParser(jwtSecretKey: Key): JwtParser = Jwts.parserBuilder().setSigningKey(jwtSecretKey).build()

    @Bean
    fun corsConfigurer(): WebMvcConfigurer {
        return object : WebMvcConfigurer {
            override fun addCorsMappings(registry: CorsRegistry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:3000")
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                    .allowedHeaders("*")
                    .allowCredentials(true)
            }
        }
    }

    @Bean
    fun securityFilter(
        httpSecurity: HttpSecurity,
        userDetailsService: UserDetailsService,
        jwtFilter: JwtFilter,
        corsConfigurationSource: CorsConfigurationSource,
        sessionRegistry: SessionRegistry,
    ): SecurityFilterChain { // @formatter:off
        var http = httpSecurity
            .csrf { cors -> cors.disable() }
            .cors { cors -> cors.configurationSource(corsConfigurationSource) }

        http = http.sessionManagement { session ->
            session
                .sessionFixation { it.none() }
                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
                .maximumSessions(1)
                .sessionRegistry(sessionRegistry)
        }

        http = http.userDetailsService(userDetailsService)

        http = http.authorizeHttpRequests { request ->
            request
                .requestMatchers(AUTH_BASIC_LOGIN).permitAll()
                .requestMatchers(HttpMethod.POST, API_INSTRUMENTS).permitAll()
                .requestMatchers(HttpMethod.POST, API_INSTRUMENTS_PAGINATED).permitAll()
                .requestMatchers(HttpMethod.GET, API_INSTRUMENT_BY_ID).permitAll()
                .requestMatchers(HttpMethod.GET, API_INSTRUMENT_TYPES).permitAll()
                .requestMatchers(HttpMethod.GET, API_INSTRUMENT_MATERIALS).permitAll()
                .requestMatchers(HttpMethod.GET, API_COUNTRIES).permitAll()
                .requestMatchers(HttpMethod.GET, API_MANUFACTURERS).permitAll()
                .requestMatchers(HttpMethod.POST, API_REGISTRATION).permitAll()
                .requestMatchers(HttpMethod.POST, API_FAVORITE_ADD).permitAll()
                .requestMatchers(HttpMethod.POST, API_FAVORITE_REMOVE).permitAll()
                .requestMatchers(HttpMethod.GET, API_FAVORITE_LIST).permitAll()
                .anyRequest().authenticated()
        }

        http = http.exceptionHandling { exception ->
            exception
                .authenticationEntryPoint { _, response, _ ->
                    response.status = HttpServletResponse.SC_UNAUTHORIZED
                }
        }

        http.addFilterBefore(
            jwtFilter,
            UsernamePasswordAuthenticationFilter::class.java,
        )

        return http.build()
    } // @formatter:on

    @Bean
    fun authenticationManager(authenticationConfiguration: AuthenticationConfiguration): AuthenticationManager {
        return authenticationConfiguration.authenticationManager
    }

    @Bean
    fun login(
        authenticationManager: AuthenticationManager,
        userRepository: UserExtractor,
        jwtSecretKey: Key,
        @Value("\${security.jwt.expiration-time}") expirationMillis: Long,
    ) = BasicLoginUseCase(authenticationManager, userRepository, jwtSecretKey, expirationMillis)

    @Bean
    fun userDetailsService(userExtractor: UserExtractor): UserDetailsService {
        return UserDetailsServiceImpl(userExtractor)
    }

    @Bean
    fun jwtTokenFilter(userDetailsService: UserDetailsService, jwtParser: JwtParser) =
        JwtFilter(userDetailsService, jwtParser)

    @Bean
    fun sessionRegistry(): SessionRegistry {
        return SessionRegistryImpl()
    }

    @Bean
    fun securityContextHolderAwareRequestFilter() = SecurityContextHolderAwareRequestFilter()

    @Bean
    fun passwordEncoder() = BCryptPasswordEncoder()
}
