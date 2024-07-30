package mu.muse.rest

const val AUTH_BASIC_LOGIN = "/api/auth/login"

const val API = "/api"
const val API_PROFILE = "$API/profile"
const val API_INSTRUMENTS = "$API/instruments"
const val API_INSTRUMENT_BY_ID = "$API/instrument/{id:\\d+}"  // id must be a number
const val API_DELETE_INSTRUMENT_BY_ID = "$API/instrument/{id:\\d+}/delete"  // id must be a number
const val API_INSTRUMENT_TYPES = "$API/instrument/types"
const val API_INSTRUMENT_MATERIALS = "$API/instrument/materials"
const val API_COUNTRIES = "$API/countries"
const val API_GET_MANUFACTURER_NAMES = "$API/manufacturers"
const val API_CREATE_INSTRUMENT = "$API/instrument/create"
