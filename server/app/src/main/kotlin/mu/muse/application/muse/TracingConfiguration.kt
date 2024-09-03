package mu.muse.application.muse

import io.opentelemetry.exporter.otlp.trace.OtlpGrpcSpanExporter
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class TracingConfiguration(
    @Value("\${tracing.url}") private val tracingUrl: String,
) {

    @Bean
    fun otlpHttpSpanExporter(): OtlpGrpcSpanExporter {
        return OtlpGrpcSpanExporter
            .builder()
            .setEndpoint(tracingUrl)
            .build()
    }
}
