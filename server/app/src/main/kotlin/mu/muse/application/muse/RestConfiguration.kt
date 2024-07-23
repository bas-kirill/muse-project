package mu.muse.application.muse

import mu.muse.rest.HelloEndpoint
import mu.muse.rest.login.BasicLoginEndpoint
import mu.muse.rest.profile.GetProfileEndpoint
import mu.muse.usecase.BasicLogin
import mu.muse.usecase.GetProfile
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class RestConfiguration {

    @Bean
    fun helloEndpoint() = HelloEndpoint()

    @Bean
    fun loginEndpoint(basicLogin: BasicLogin) = BasicLoginEndpoint(basicLogin)

    @Bean
    fun getProfileEndpoint(getProfile: GetProfile) = GetProfileEndpoint(getProfile)
}
