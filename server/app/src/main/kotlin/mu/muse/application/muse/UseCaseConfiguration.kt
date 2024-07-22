package mu.muse.application.muse

import mu.muse.usecase.JwtGenerator
import mu.muse.usecase.JwtUsernameExtractor
import mu.muse.usecase.JwtValidator
import mu.muse.usecase.BasicLogin
import mu.muse.usecase.access.UserExtractor
import mu.muse.usecase.scenario.JwtGeneratorUseCase
import mu.muse.usecase.scenario.JwtUsernameExtractorUseCase
import mu.muse.usecase.scenario.JwtValidatorUseCase
import mu.muse.usecase.scenario.BasicLoginUseCase
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationManager

@Configuration
class UseCaseConfiguration {

    @Bean
    fun jwtValidator(
        @Value("\${security.jwt.secret-key}") jwtSecretKey: String,
        userExtractor: UserExtractor,
    ): JwtValidator {
        return JwtValidatorUseCase(jwtSecretKey, userExtractor)
    }

    @Bean
    fun jwtUsernameExtractor(@Value("\${security.jwt.secret-key}") jwtSecretKey: String): JwtUsernameExtractor {
        return JwtUsernameExtractorUseCase(jwtSecretKey)
    }

    @Bean
    fun jwtGenerator(
        @Value("\${security.jwt.secret-key}") jwtSecretKey: String,
        @Value("\${security.jwt.expiration-time}") expiration: Long,
    ): JwtGenerator {
        return JwtGeneratorUseCase(jwtSecretKey, expiration)
    }

    @Bean
    fun login(
        userRepository: UserExtractor,
        authenticationManager: AuthenticationManager,
        jwtGenerator: JwtGenerator
    ): BasicLogin {
        return BasicLoginUseCase(userRepository, authenticationManager, jwtGenerator)
    }
}
