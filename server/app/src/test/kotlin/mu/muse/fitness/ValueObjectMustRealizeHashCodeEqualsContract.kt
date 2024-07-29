package mu.muse.fitness

import com.tngtech.archunit.core.domain.JavaClass
import com.tngtech.archunit.junit.AnalyzeClasses
import com.tngtech.archunit.junit.ArchTest
import com.tngtech.archunit.junit.CacheMode
import com.tngtech.archunit.lang.ArchCondition
import com.tngtech.archunit.lang.ArchRule
import com.tngtech.archunit.lang.ConditionEvents
import com.tngtech.archunit.lang.SimpleConditionEvent
import com.tngtech.archunit.lang.syntax.ArchRuleDefinition
import mu.muse.common.annotations.ValueObject
import org.assertj.core.api.Assertions.assertThat


@AnalyzeClasses(packages = ["mu.muse"], cacheMode = CacheMode.PER_CLASS)
class ValueObjectMustRealizeHashCodeEqualsContract {

    @ArchTest
    @Suppress("VariableNaming")
    val `value objects must realize equals, hashCode contract`: ArchRule =
        ArchRuleDefinition.classes()
            .that().areAnnotatedWith(ValueObject::class.java)
            .should(`have equals() and hashCode() methods`())

    private fun `have equals() and hashCode() methods`(): ArchCondition<JavaClass> {
        return object : ArchCondition<JavaClass>("have equals and hashCode methods") {
            override fun check(javaClass: JavaClass, events: ConditionEvents) {
                val hasEqualsMethod = javaClass .getMethod("equals", Object::class.java) != null
                val hasHashCodeMethod = javaClass.getMethod("hashCode") != null

                val message = "${javaClass.name} should implement equals() and hashCode() methods"
                val satisfied = hasEqualsMethod && hasHashCodeMethod

                events.add(SimpleConditionEvent(javaClass, satisfied, message))

                if (!satisfied) {
                    assertThat(hasEqualsMethod).`as`("${javaClass.name} should implement equals() method").isTrue
                    assertThat(hasHashCodeMethod).`as`("${javaClass.name} should implement hashCode() method").isTrue
                }
            }
        }
    }
}
