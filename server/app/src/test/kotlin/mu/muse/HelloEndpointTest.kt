package mu.muse

import mu.muse.rest.HelloEndpoint
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.test.context.ContextConfiguration
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.get

@WebMvcTest
@ContextConfiguration(classes = [HelloEndpointTest.TestConfiguration::class])
internal class HelloEndpointTest {
    @Autowired
    lateinit var mockMvc: MockMvc

    @Test
    fun `get 'Hello, world!' body`() {
        mockMvc
            .get("/hello")
            .andDo { print() }
            .andExpect {
                status { isOk() }
                content {
                    string("Hello, World!")
                }
            }
    }

    @Configuration
    class TestConfiguration {
        @Bean
        fun helloEndpoint() = HelloEndpoint()
    }
}
