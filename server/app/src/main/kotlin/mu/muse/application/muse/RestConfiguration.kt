package mu.muse.application.muse

import mu.muse.rest.HelloEndpoint
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class RestConfiguration {
    @Bean
    fun helloEndpoint() = HelloEndpoint()
}
