if(NOT TARGET fbjni::fbjni)
add_library(fbjni::fbjni SHARED IMPORTED)
set_target_properties(fbjni::fbjni PROPERTIES
    IMPORTED_LOCATION "/Users/shahoodhussain/.gradle/caches/transforms-4/c7e26f7d3c2fc1a6636ff1467fc77795/transformed/jetified-fbjni-0.6.0/prefab/modules/fbjni/libs/android.x86_64/libfbjni.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/shahoodhussain/.gradle/caches/transforms-4/c7e26f7d3c2fc1a6636ff1467fc77795/transformed/jetified-fbjni-0.6.0/prefab/modules/fbjni/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

