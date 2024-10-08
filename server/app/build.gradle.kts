import io.gitlab.arturbosch.detekt.Detekt
import org.jooq.meta.jaxb.Property

val rootProjectDir = "$projectDir/../.."

plugins {
    java
    id("org.springframework.boot") version "3.2.5"
    id("io.spring.dependency-management") version "1.1.4"
    kotlin("jvm") version "1.9.23"
    kotlin("plugin.spring") version "1.9.23" // make all classes as `open` for Spring proxies
    id("org.jlleitschuh.gradle.ktlint") version "12.1.1"
    id("io.gitlab.arturbosch.detekt") version "1.23.6"
    id("org.sonarqube") version "5.0.0.4638"
    id("org.openapi.generator") version "7.8.0"
    id("info.solidsoft.pitest") version "1.15.0"
    id("nu.studer.jooq") version "6.0.1"
}

val schemaVersion by extra { "1" }

group = "mu.muse"
version = "1.0.0-SNAPSHOT"

java {
    sourceCompatibility = JavaVersion.VERSION_21
    targetCompatibility = JavaVersion.VERSION_21
}

kotlin {
    jvmToolchain(21)
}

configurations {
    compileOnly {
        extendsFrom(configurations.annotationProcessor.get())
    }
}

springBoot {
    buildInfo()
}

repositories {
    mavenLocal()
    mavenCentral()
}

dependencies {
    compileOnly("org.springframework.boot:spring-boot-devtools")
    implementation("org.springframework.boot:spring-boot-starter-web")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    annotationProcessor("org.springframework.boot:spring-boot-configuration-processor")
    implementation("org.springframework.boot:spring-boot-starter-actuator")
    implementation("org.springframework.boot:spring-boot-starter-security")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.springframework.security:spring-security-test")
    testImplementation("com.tngtech.archunit:archunit-junit5:1.3.0")
    implementation("io.jsonwebtoken:jjwt-api:0.11.5")
    implementation("io.jsonwebtoken:jjwt-impl:0.11.5")
    implementation("io.jsonwebtoken:jjwt-jackson:0.11.5")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
    implementation(kotlin("stdlib-jdk8"))
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.17.2")
    implementation("io.swagger.core.v3:swagger-annotations:2.2.22")
    implementation("jakarta.validation:jakarta.validation-api:3.1.0")  // `useSpringBoot3` param requires it
    implementation("org.postgresql:postgresql")
    implementation("org.springframework.boot:spring-boot-starter-data-jdbc")
    implementation("org.jooq:jooq:3.19.11")
    jooqGenerator("org.jooq:jooq-meta-extensions:3.19.11")
    implementation("io.micrometer:micrometer-tracing-bridge-otel")
    implementation("io.opentelemetry:opentelemetry-exporter-otlp")
}

tasks.named<Test>("test") {
    useJUnitPlatform()
}

configure<org.jlleitschuh.gradle.ktlint.KtlintExtension> {
    debug = true
    verbose.set(true)
    ignoreFailures.set(false)

    filter {
        exclude("**/generated/**")
        include("**/kotlin/**")
    }
}

detekt {
    buildUponDefaultConfig = true
    config.setFrom("$rootProjectDir/tools/detekt/detekt-config.yml")
}

tasks.withType<Detekt>().configureEach {
    reports {
        html.required.set(true)
    }
}

sonar {  // self hosted sonar qube
    properties {
        property("sonar.projectKey", "bas-kirill_muse-project_c40bc999-8826-433b-bb84-8871688b1ab1")
        property("sonar.projectName", "muse-project")
    }
}

sourceSets {
    main {
        kotlin {
            srcDir(layout.buildDirectory.dir("openapi/src/main").get().toString())
            srcDir(layout.buildDirectory.dir("generated-src/jooq/main").get().toString())
        }
    }
}

openApiGenerate {
    apiPackage = "mu.muse.rest.api"
    modelPackage = "mu.muse.rest.dto"
    generateApiTests = false
    generateModelTests = false
    generateApiDocumentation = false
    generateModelDocumentation = false
    inputSpec = "$rootProjectDir/openapi/openapi.yml"
    outputDir = layout.buildDirectory.dir("openapi").get().toString()
    generatorName = "kotlin-spring"
    configOptions = mapOf(
        "sourceFolder" to "src/main/kotlin",
        "useSpringBoot3" to "true",
        "useTags" to "true",
        "exceptionHandler" to "false",
        "interfaceOnly" to "true",
        "skipDefaultInterface" to "true",
        "documentationProvider" to "none",
    )
    globalProperties = mapOf(
        "verbose" to "true",
    )
}

tasks.compileKotlin {
    dependsOn("openApiGenerate")
}

tasks.runKtlintCheckOverMainSourceSet {
    dependsOn("openApiGenerate")
}

tasks.test {
    dependsOn("openApiGenerate")
}

pitest {
    junit5PluginVersion = "1.3.0"
    targetClasses = setOf("mu.muse.*")
    timestampedReports = false
}

jooq {
    version.set("3.19.11")
    configurations {
        create("main") {
            jooqConfiguration.apply {
                logging = org.jooq.meta.jaxb.Logging.WARN
                generator.apply {
                    name = "org.jooq.codegen.KotlinGenerator"
                    database.apply {
                        name = "org.jooq.meta.extensions.ddl.DDLDatabase"
                        properties.apply {
                            add(Property().apply {
                                key = "scripts"
                                value = "./src/main/resources/db/schema.sql"
                            })
                            add(Property().apply {
                                key = "defaultNameCase"
                                value = "lower"
                            })
                        }
                    }

                    generate.apply {
                        isPojos = true
                        isPojosAsKotlinDataClasses = true
                        isImmutablePojos = true
                        isImmutableInterfaces = true
                        isGeneratedAnnotation = true
                        isGeneratedAnnotationDate = true
                        isInterfaces = true
                    }

                    target.apply {
                        packageName = "mu.muse.codegen.jooq"
                    }
                }
            }
        }
    }
}
