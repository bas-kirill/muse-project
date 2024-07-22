package mu.muse.application.muse

import mu.muse.rest.HelloEndpoint
import mu.muse.rest.BasicLoginEndpoint
import mu.muse.usecase.BasicLogin
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class RestConfiguration {

    @Bean
    fun helloEndpoint() = HelloEndpoint()

    @Bean
    fun loginEndpoint(basicLogin: BasicLogin) = BasicLoginEndpoint(basicLogin)
}
