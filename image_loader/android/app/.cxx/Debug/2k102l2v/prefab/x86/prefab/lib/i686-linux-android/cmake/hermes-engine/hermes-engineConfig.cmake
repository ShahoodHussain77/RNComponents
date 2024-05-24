if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/shahoodhussain/.gradle/caches/transforms-4/e7689cf58141a18272e612b148cefd59/transformed/jetified-hermes-android-0.74.1-debug/prefab/modules/libhermes/libs/android.x86/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/shahoodhussain/.gradle/caches/transforms-4/e7689cf58141a18272e612b148cefd59/transformed/jetified-hermes-android-0.74.1-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

