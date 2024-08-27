package mu.muse.application.muse

import io.jsonwebtoken.JwtParser
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.security.Keys
import jakarta.servlet.http.HttpServletResponse
import mu.muse.application.Application
import mu.muse.rest.ACTUATOR_HEALTH
import mu.muse.rest.API_COUNTRIES
import mu.muse.rest.API_INSTRUMENTS
import mu.muse.rest.API_INSTRUMENTS_PAGINATED
import mu.muse.rest.API_INSTRUMENT_BY_ID
import mu.muse.rest.API_INSTRUMENT_MATERIALS
import mu.muse.rest.API_INSTRUMENT_PHOTO
import mu.muse.rest.API_INSTRUMENT_TYPES
import mu.muse.rest.API_LOGIN
import mu.muse.rest.API_MANUFACTURERS
import mu.muse.rest.API_REGISTRATION
import mu.muse.usecase.access.user.UserExtractor
import mu.muse.usecase.scenario.user.BasicLoginUseCase
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
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
import org.springframework.security.crypto.password.DelegatingPasswordEncoder
import org.springframework.security.crypto.password.NoOpPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import java.security.Key


@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true, jsr250Enabled = true)
@Suppress("TooManyFunctions")
class SecurityConfiguration {

    @Value("#{systemEnvironment['CLIENT_PORT']}")
    lateinit var clientPort: String

    companion object {
        val logger: Logger = LoggerFactory.getLogger(SecurityConfiguration::class.java)
    }

    @Bean
    fun jwtSecretKey(@Value("\${security.jwt.secret-key}") jwtSecretKey: String): Key =
        Keys.hmacShaKeyFor(jwtSecretKey.toByteArray())

    @Bean
    fun jwtParser(jwtSecretKey: Key): JwtParser = Jwts.parserBuilder().setSigningKey(jwtSecretKey).build()

    @Bean
    fun localCorsConfigurationSource(): CorsConfigurationSource {
        logger.info("keeek: 'dev'")
        val configuration = CorsConfiguration()
//        configuration.allowedOrigins = when {
//            Application.Profile.SPRING_LOCAL_PROFILE -> listOf("http://localhost:3000")
//
//        }
  /*      if (clientPort == Application.Profile.SPRING_LOCAL_PROFILE) {
            configuration.allowedOrigins = listOf("http://localhost:3000")
        }*/

        configuration.allowedOrigins = listOf("http://localhost:3000")
        configuration.allowedMethods = listOf("GET", "POST", "PUT", "DELETE", "OPTIONS")
        configuration.allowedHeaders = listOf("*")
        configuration.allowCredentials = true

        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", configuration)
        return source
    }

    @Bean
    @Profile(Application.Profile.SPRING_DEV_PROFILE)
    fun devCorsConfigurationSource(): CorsConfigurationSource {
        logger.info("keeek: 'dev'")
        val configuration = CorsConfiguration()
        configuration.allowedOrigins = listOf("http://88.201.171.120:50001")
        configuration.allowedMethods = listOf("GET", "POST", "PUT", "DELETE", "OPTIONS")
        configuration.allowedHeaders = listOf("*")
        configuration.allowCredentials = true

        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", configuration)
        return source
    }

    @Bean
    fun securityFilter(
        httpSecurity: HttpSecurity,
        userDetailsService: UserDetailsService,
        jwtFilter: JwtFilter,
    ): SecurityFilterChain { // @formatter:off
        var http = httpSecurity.cors().and().csrf().disable()

        http = http.sessionManagement { session ->
            session
                .sessionFixation { it.none() }
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        }

        http = http.userDetailsService(userDetailsService)

        http = http.authorizeHttpRequests { request ->
            request
                .requestMatchers(API_LOGIN).permitAll()
                .requestMatchers(HttpMethod.POST, API_INSTRUMENTS).permitAll()
                .requestMatchers(HttpMethod.POST, API_INSTRUMENTS_PAGINATED).permitAll()
                .requestMatchers(HttpMethod.GET, API_INSTRUMENT_BY_ID).permitAll()
                .requestMatchers(HttpMethod.GET, API_INSTRUMENT_TYPES).permitAll()
                .requestMatchers(HttpMethod.GET, API_INSTRUMENT_MATERIALS).permitAll()
                .requestMatchers(HttpMethod.GET, API_COUNTRIES).permitAll()
                .requestMatchers(HttpMethod.GET, API_MANUFACTURERS).permitAll()
                .requestMatchers(HttpMethod.POST, API_REGISTRATION).permitAll()
                .requestMatchers(HttpMethod.GET, API_INSTRUMENT_PHOTO).permitAll()
                .requestMatchers(HttpMethod.GET, ACTUATOR_HEALTH).permitAll()
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
    fun passwordEncoder(): PasswordEncoder {
        val idForEncode = "bcrypt"
        val encoders: MutableMap<String, PasswordEncoder> = mutableMapOf(
            idForEncode to BCryptPasswordEncoder(),
            "noop" to NoOpPasswordEncoder.getInstance(),  // dev env only
        )
        return DelegatingPasswordEncoder(idForEncode, encoders);
    }
}
