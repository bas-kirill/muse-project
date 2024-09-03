package mu.muse.application.muse

import io.opentelemetry.api.trace.Span
import io.opentelemetry.api.trace.Tracer
import org.jooq.ExecuteContext
import org.jooq.ExecuteListener
import java.util.concurrent.ConcurrentHashMap

class JaegerDbSpanCreator(
    private val tracer: Tracer,
) : ExecuteListener {

    companion object {
        const val CONTEXT_KEY_SPAN_ID = "spanId"
    }

    private val spanIdToSpan = ConcurrentHashMap<String, Span>()

    override fun start(ctx: ExecuteContext) {
        val span = tracer.spanBuilder("PostgreSQL Query").startSpan()
        span.setAttribute("sql", ctx.query().toString())
        val spanId = span.spanContext.spanId
        spanIdToSpan[spanId] = span
        ctx.data(CONTEXT_KEY_SPAN_ID, spanId)
    }

    override fun end(ctx: ExecuteContext) {
        val spanId = ctx.data(CONTEXT_KEY_SPAN_ID)
        val span = spanIdToSpan.remove(spanId)
            ?: throw RuntimeException("No span for Span ID=`${spanId}`") // fail-fast in case of breaking invariant
        span.end()
    }
}
