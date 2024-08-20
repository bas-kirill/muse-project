import io.gitlab.arturbosch.detekt.Detekt

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
}

group = "mu.muse"
version = "1.0.0-SNAPSHOT"

java {
    sourceCompatibility = JavaVersion.VERSION_17
    targetCompatibility = JavaVersion.VERSION_17
}

kotlin {
    jvmToolchain(17)
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
}

tasks.named<Test>("test") {
    useJUnitPlatform()
}

configure<org.jlleitschuh.gradle.ktlint.KtlintExtension> {
    debug.set(true)
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
            srcDir("${layout.buildDirectory}/openapi/src/main")
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
    inputSpecRootDirectory = "$rootProjectDir/openapi"
    outputDir = "${layout.buildDirectory}/openapi"
    validateSpec = true
    generatorName = "kotlin-spring"
    configOptions = mapOf(
        "idea" to "true",
        "sourceFolder" to "src/main/kotlin",
        "useSpringBoot3" to "true",
        "serializationLibrary" to "jackson",
        "useCoroutines" to "true",
        "useTags" to "true",
        "exceptionHandler" to "false",
        "interfaceOnly" to "true",
        "skipDefaultInterface" to "true",
        "documentationProvider" to "none",
    )
}

tasks.compileKotlin {
    dependsOn("openApiGenerate")
}

tasks.test {
    dependsOn("openApiGenerate")
}
