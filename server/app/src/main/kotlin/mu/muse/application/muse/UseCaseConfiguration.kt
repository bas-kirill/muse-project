package mu.muse.application.muse

import mu.muse.application.jwt.JwtGenerator
import mu.muse.usecase.access.InstrumentExtractor
import mu.muse.usecase.access.UserExtractor
import mu.muse.usecase.scenario.BasicLoginUseCase
import mu.muse.usecase.scenario.GetAllInstrumentsUseCase
import mu.muse.usecase.scenario.GetInstrumentByIdUseCase
import mu.muse.usecase.scenario.GetProfileUseCase
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationManager

@Configuration
class UseCaseConfiguration {

    @Bean
    fun login(
        authenticationManager: AuthenticationManager,
        userRepository: UserExtractor,
        jwtGenerator: JwtGenerator,
    ) = BasicLoginUseCase(authenticationManager, userRepository, jwtGenerator)

    @Bean
    fun getProfile(userExtractor: UserExtractor) = GetProfileUseCase(userExtractor)

    @Bean
    fun getAllInstruments(instrumentExtractor: InstrumentExtractor) = GetAllInstrumentsUseCase(instrumentExtractor)

    @Bean
    fun getInstrumentById(instrumentExtractor: InstrumentExtractor) = GetInstrumentByIdUseCase(instrumentExtractor)
}
