package mu.muse.application.muse

import mu.muse.usecase.JwtUsernameExtractor
import mu.muse.usecase.JwtValidator
import mu.muse.usecase.access.UserExtractor
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configurers.SessionManagementConfigurer
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.core.session.SessionRegistry
import org.springframework.security.core.session.SessionRegistryImpl
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.security.web.util.matcher.AntPathRequestMatcher
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true, jsr250Enabled = true)
class SecurityConfiguration {

    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource {
        val configuration = CorsConfiguration()
        configuration.addAllowedOrigin("http://localhost:3000")
        configuration.addAllowedMethod("*") // Allow all HTTP methods
        configuration.addAllowedHeader("*") // Allow all headers
        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", configuration)
        return source
    }

    @Bean
    fun securityFilter(
        http: HttpSecurity,
        userDetailsService: UserDetailsService,
        jwtTokenFilter: JwtTokenFilter,
        corsConfigurationSource: CorsConfigurationSource,
        sessionRegistry:SessionRegistry,
    ): SecurityFilterChain { // @formatter:off
        var http = http
            .csrf { cors -> cors.disable() }
            .cors { cors -> cors.configurationSource(corsConfigurationSource) }

        http = http.sessionManagement { session ->
            session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .maximumSessions(1)
                .sessionRegistry(sessionRegistry)
        }

        http = http.userDetailsService(userDetailsService)

        http = http.authorizeHttpRequests { request ->
            request
                .requestMatchers(AntPathRequestMatcher("/api/auth/**")).permitAll()
                .anyRequest().authenticated()
        }

        http.addFilterBefore(
            jwtTokenFilter,
            UsernamePasswordAuthenticationFilter::class.java,
        )

        return http.build()
    } // @formatter:on

    @Bean
    fun authenticationManager(authenticationConfiguration: AuthenticationConfiguration): AuthenticationManager {
        return authenticationConfiguration.authenticationManager
    }

    @Bean
    fun userDetailsService(userExtractor: UserExtractor): UserDetailsServiceImpl {
        return UserDetailsServiceImpl(userExtractor)
    }

    @Bean
    fun jwtTokenFilter(
        jwtValidator: JwtValidator,
        userDetailsService: UserDetailsServiceImpl,
        jwtUsernameExtractor: JwtUsernameExtractor
    ): JwtTokenFilter {
        return JwtTokenFilter(jwtValidator, userDetailsService, jwtUsernameExtractor)
    }

    @Bean
    fun sessionRegistry() : SessionRegistry {
        return SessionRegistryImpl()
    }
}
