export const viAndroidPlatformConceptTranslations = {
  "android-build-variants": {
    title: "Android build variant và merged manifest",
    description:
      "Đọc Android Gradle project phía sau cả React Native lẫn Compose, rồi kiểm tra đầu vào của từng variant và bản đóng gói release.",
    implementations: {
      "react-native": {
        name: "Build Android host",
        summary:
          "Android project trong android/ dùng Gradle và React Native Gradle Plugin.",
      },
      kotlin: {
        name: "Build ứng dụng Compose",
        summary:
          "App module dùng Android Gradle Plugin để tạo variant đã chọn.",
      },
    },
    relationship:
      "Cả hai Android project đều dùng Gradle để tạo variant. React Native thêm plugin đóng gói JavaScript và assets cho variant không debuggable; Compose không có JavaScript bundle.",
    mentalModel:
      "Android Studio mở Gradle project. App module kết hợp build type với product flavor (nếu có) thành variant; Gradle chọn source set, gộp manifest và resources, rồi đóng gói artifact. React Native thêm bước đóng gói JavaScript vào cùng quy trình Android này.",
    differences: [
      "Repository React Native thường đặt Android Gradle project trong android/; repository Compose native thường mở Android project ngay ở thư mục gốc.",
      "Khi gộp resources và manifests, đầu vào trong src/<variant>/, src/<buildType>/ và src/<flavor>/ được ưu tiên hơn src/main/.",
      "Trong React Native, debuggableVariants không đóng gói JavaScript bundle và phải dùng Metro; đánh dấu variant phát hành là debuggable có thể tạo artifact không chạy được.",
    ],
    commonMistakes: [
      "Chỉ sửa src/main/AndroidManifest.xml mà không kiểm tra merged manifest của variant sắp phát hành.",
      "Cho rằng build debug APK thành công chứng minh signing, resources và JavaScript bundle của bản release đã đúng.",
    ],
    productionNotes: [
      "Kiểm tra build variant đã chọn và Merged Manifest trong Android Studio; chạy tác vụ sourceSets khi chưa rõ file thuộc nguồn nào.",
      "Cấu hình release signing trước khi chạy apksigner, đối chiếu chứng thư được in ra với release key dự kiến và xác nhận bản React Native release chứa JavaScript bundle. Trên Windows, dùng gradlew.bat thay cho ./gradlew.",
    ],
  },
  "android-intents": {
    title: "Android Intent và thao tác bên ngoài",
    description:
      "Đối chiếu Linking và Share của React Native với Android Intent khi mở liên kết, chia sẻ và nhận dữ liệu từ bên ngoài.",
    implementations: {
      "react-native": {
        name: "Mở web link qua Linking",
        summary:
          "Linking yêu cầu nền tảng native xử lý URL và trả về lỗi khi không mở được.",
      },
      kotlin: {
        name: "Gửi implicit ACTION_VIEW Intent",
        summary: "Android tìm Activity có thể xử lý URL từ Intent.",
      },
    },
    relationship:
      "Linking và Share cung cấp các thao tác bên ngoài thường dùng, còn Android Intent là cơ chế gửi thông điệp và tìm thành phần xử lý của nền tảng. Intent không thay thế trực tiếp route điều hướng trong ứng dụng.",
    mentalModel:
      "Tách destination trong ứng dụng khỏi yêu cầu gửi sang ứng dụng khác. Implicit Intent mô tả action và dữ liệu để Android tìm nơi xử lý; explicit Intent chỉ đích danh component. Intent filter khai báo ứng dụng có thể nhận gì, còn mọi dữ liệu đầu vào phải được kiểm tra trước khi điều hướng.",
    differences: [
      "Linking.openURL là API phía JavaScript; ACTION_VIEW và ACTION_SEND là action Android được tìm khớp với ứng dụng đã cài và intent filter của chúng.",
      "Deep link lúc mở mới đi qua initial URL hoặc Activity intent; link đến instance đang chạy dùng listener hoặc onNewIntent, nhưng onNewIntent chỉ xảy ra khi cách khởi chạy Android tái sử dụng Activity đó.",
      "Intent filter trong manifest giúp Activity có thể nhận implicit Intent; bản thân filter không kiểm tra path parameter hay xác minh quyền sở hữu HTTPS App Link.",
    ],
    commonMistakes: [
      "Dùng Android Intent như route của Compose hoặc mặc định rằng mọi thiết bị đều có Activity xử lý thao tác bên ngoài.",
      "Chỉ xử lý link lúc mở mới, bỏ sót link đến sau, hoặc tin URI bên ngoài mà không parse và kiểm tra.",
    ],
    productionNotes: [
      "Dùng chooser khi người dùng muốn chia sẻ và có cách xử lý phù hợp nếu thao tác bên ngoài không mở được.",
      "Kiểm tra link khi mở mới và khi ứng dụng đang chạy với manifest và launch mode thực tế; xác minh HTTPS App Links riêng nếu sản phẩm yêu cầu chứng minh quyền sở hữu domain.",
    ],
  },
  "android-activity-lifecycle": {
    title: "Lifecycle của Android Activity và màn hình",
    description:
      "Chọn công việc theo vòng đời của màn hình đang hiển thị, không xem AppState, Activity callback và composition là cùng một vòng đời.",
    implementations: {
      "react-native": {
        name: "Theo dõi thay đổi foreground của ứng dụng",
        summary:
          "AppState báo trạng thái foreground/background của ứng dụng và listener cần được dọn dẹp.",
      },
      kotlin: {
        name: "Phản ứng với lifecycle event",
        summary:
          "LifecycleEventEffect theo dõi LifecycleOwner hiện tại trong Compose.",
      },
    },
    relationship:
      "Cả hai đều có thể phản ứng khi người dùng quay lại, nhưng AppState mô tả trạng thái ở mức ứng dụng còn Compose lifecycle effect theo LifecycleOwner của nó; cả hai đều không đồng nghĩa với lúc React component mount/unmount.",
    mentalModel:
      "Hỏi ai sở hữu vòng đời của công việc: ứng dụng ở foreground, Activity đang hiển thị, màn hình đang hiển thị hay composition. Dùng lifecycle-aware effect cho tài nguyên nền tảng cần cặp start/stop; dùng collectAsStateWithLifecycle cho StateFlow của màn hình; giữ dữ liệu nghiệp vụ trong ViewModel hoặc repository.",
    differences: [
      "AppState.active/background không trùng với chuỗi ON_RESUME/ON_STOP của Activity; một Android Activity khác cũng có thể khiến React Native báo background.",
      "Composable có thể rời composition khi Activity vẫn ở trạng thái started, và Activity có thể được tạo lại trong khi ViewModel giữ screen state.",
      "collectAsStateWithLifecycle chỉ collect khi LifecycleOwner đạt trạng thái hoạt động, mặc định là STARTED; API này không tự lưu dữ liệu qua process death.",
    ],
    commonMistakes: [
      "Khởi động subscription trong thân composable hoặc Activity callback mà không dọn dẹp tương ứng, gây công việc trùng sau khi tạo lại.",
      "Chỉ dùng AppState để kết luận một màn hình điều hướng đang được focus, hoặc lưu dữ liệu chậm trong onPause.",
    ],
    productionNotes: [
      "Dùng LifecycleResumeEffect cho camera hay tài nguyên tương tự phải dừng khi pause, với onPauseOrDispose để dọn dẹp khi màn hình rời composition.",
      "Dùng collectAsStateWithLifecycle cho StateFlow của ViewModel; kiểm tra background/foreground, đổi route, xoay màn hình và process recreation riêng vì chúng thử các vòng đời khác nhau.",
    ],
  },
  "android-app-entry": {
    title: "Điểm vào ứng dụng Android và Activity",
    description:
      "Theo dõi quá trình mở ứng dụng từ AndroidManifest.xml và Activity đến Compose, không nhầm với điểm vào JavaScript của React Native.",
    implementations: {
      "react-native": {
        name: "Đăng ký root JavaScript",
        summary:
          "AppRegistry đăng ký root component; Android host vẫn phải khởi chạy ứng dụng native.",
      },
      kotlin: {
        name: "Khởi chạy Activity và đặt nội dung Compose",
        summary:
          "Android tìm launcher Activity đã khai báo; ComponentActivity sau đó gắn Compose UI.",
      },
    },
    relationship:
      "AppRegistry chọn root JavaScript của React Native sau khi native host khởi động; AndroidManifest.xml và Activity là điểm vào của nền tảng Android, không thay thế React component.",
    mentalModel:
      "Theo chuỗi khởi chạy: ứng dụng đã cài và manifest → launcher intent → Activity.onCreate → setContent → composable. Ứng dụng React Native cũng có Android host trước khi AppRegistry chạy root JavaScript.",
    differences: [
      'Android phải khai báo Activity có thể khởi chạy trong AndroidManifest.xml; Activity có launcher intent filter cần android:exported="true".',
      "Lifecycle callback của Activity thuộc về nền tảng; composable có thể vào hoặc rời composition độc lập với việc Activity được tạo lại.",
      "Cấu hình build nằm trong Gradle, không nằm ở file điểm vào JavaScript; project Android của React Native cũng dùng Gradle trong android/.",
    ],
    commonMistakes: [
      "Xem AppRegistry.registerComponent là Android launcher hoặc đặt navigation và UI state có thể thay đổi trong Activity.onCreate.",
      "Thêm intent filter nhưng quên khai báo trong manifest hoặc yêu cầu android:exported.",
    ],
    productionNotes: [
      "Giữ Activity là host gọn cho phần tích hợp nền tảng dùng chung và nội dung Compose. Kiểm tra dữ liệu intent từ bên ngoài trước khi chuyển thành destination.",
      "Kiểm tra merged manifest và cấu hình Gradle của app module khi cách khởi chạy khác nhau giữa các build variant; chỉ xem JavaScript có thể bỏ sót lỗi đóng gói Android.",
    ],
  },
  "android-resources": {
    title: "Android resources và bản địa hóa",
    description:
      "Đưa text giao diện vào Android resources theo locale rồi đọc từ Compose, gồm chuỗi có tham số và số nhiều.",
    implementations: {
      "react-native": {
        name: "Đọc từ lớp dịch của ứng dụng",
        summary:
          "React Native không cung cấp hàm t() này; ứng dụng hoặc thư viện i18n được chọn sở hữu nó.",
      },
      kotlin: {
        name: "Đọc Android string resource",
        summary:
          "stringResource của Compose đọc resource Android phù hợp với cấu hình hiện tại.",
      },
    },
    relationship:
      "Cả hai đều hiển thị text theo locale, nhưng React Native dùng lớp dịch do ứng dụng chọn còn Compose đọc resources được hệ thống cấu hình Android lựa chọn.",
    mentalModel:
      "Ánh xạ translation key sang R.string ID, đặt text mặc định trong res/values/strings.xml và text tiếng Việt trong res/values-vi/strings.xml, rồi gọi stringResource trong composable. Giữ bộ resource mặc định đầy đủ để làm fallback.",
    differences: [
      "Android tạo R identifier có type từ tên resource và chọn qualifier như values-vi; helper t() trong React Native là code của ứng dụng, không phải API framework.",
      "Với text động, Android XML dùng tham số định dạng và quantity resource; đừng ghép nhiều mảnh câu cần dịch bằng nối chuỗi.",
      "Đọc UI string theo cấu hình hiện tại khi render, không cache bản dịch trong singleton lúc khởi động.",
    ],
    commonMistakes: [
      "Cho rằng React Native có sẵn API t() hoặc một quy tắc số nhiều tiếng Anh dùng được cho mọi locale.",
      "Viết cứng text đã dịch trong composable hoặc thiếu resource mặc định khi thêm bản theo locale.",
    ],
    productionNotes: [
      "Kiểm tra trên locale thiết bị thực tế và các giá trị đã định dạng trong UI test; khi cấu hình thay đổi, resource mới phải được hiển thị.",
      "Dùng pluralStringResource cho ngữ pháp phụ thuộc số lượng; chỉ truyền lại count khi chuỗi được chọn cần định dạng con số đó.",
    ],
  },
} as const;

export const viAndroidPlatformRoadmapTranslations = {
  "android-build-variants": {
    title: "Android build variant và merged manifest",
    exercise:
      "Build debug và release, tạo demo flavor nếu chưa có, rồi xác định source set/manifest nào tham gia mỗi variant và kiểm tra artifact release.",
    checklist: [
      "Phân biệt build type, product flavor và build variant",
      "Tìm được merged manifest của đúng variant",
      "Kiểm tra signing và JavaScript bundle trước khi phát hành React Native",
    ],
    stages: [
      "Build debug APK từ Gradle wrapper của hai loại project Android.",
      "Liệt kê source set và build demoDebug sau khi đã cấu hình demo flavor.",
      "Build đúng release APK, kiểm tra chứng thư ký và rà soát merged manifest cùng JavaScript bundle nếu dùng React Native.",
    ],
  },
  "android-intents": {
    title: "Android Intent và thao tác bên ngoài",
    exercise:
      "Mở trang trợ giúp, chia sẻ một link và xử lý link đến từ bên ngoài ở cả lần mở mới lẫn khi ứng dụng đang chạy, gồm trường hợp URI không hợp lệ.",
    checklist: [
      "Phân biệt implicit Intent, explicit Intent và route nội bộ",
      "Có fallback khi không mở được thao tác bên ngoài",
      "Kiểm tra URI đầu vào và cả luồng mở mới lẫn luồng đến sau",
    ],
    stages: [
      "Mở trang trợ giúp qua Linking hoặc ACTION_VIEW và xử lý khi không có ứng dụng nhận.",
      "Chia sẻ cùng nội dung qua Share hoặc ACTION_SEND với chooser.",
      "Đưa cold/warm link qua cùng bộ kiểm tra route; xem lại manifest và launch mode thực tế.",
    ],
  },
  "android-activity-lifecycle": {
    title: "Lifecycle của Android Activity và màn hình",
    exercise:
      "Theo dõi sự kiện màn hình hiện lại, dừng camera preview khi không còn tương tác và chỉ nhận cập nhật danh sách khi màn hình hoạt động; kiểm tra đổi route, về nền và xoay màn hình.",
    checklist: [
      "Phân biệt AppState, Activity, LifecycleOwner và composition",
      "Dọn dẹp tài nguyên khi pause hoặc rời màn hình",
      "Collect StateFlow theo lifecycle mà không để mất state nghiệp vụ",
    ],
    stages: [
      "Ghi nhận lúc ứng dụng hoặc LifecycleOwner trở lại foreground.",
      "Khởi động và dừng camera preview theo vòng đời tương ứng, kể cả khi rời màn hình.",
      "Chỉ nhận cập nhật dữ liệu khi đang hoạt động; dùng cleanup của subscription hoặc collectAsStateWithLifecycle.",
    ],
  },
  "android-app-entry": {
    title: "Điểm vào ứng dụng Android và Activity",
    exercise:
      "Lần theo quá trình mở màn hình Welcome từ Android launcher đến Compose; giải thích AppRegistry nằm ở đâu trong ứng dụng React Native và xử lý URL đầu vào không hợp lệ.",
    checklist: [
      "Phân biệt JavaScript root với Android launcher Activity",
      "Khai báo Activity trong manifest và kiểm tra dữ liệu intent bên ngoài",
      "Giữ Activity là host gọn, không đặt screen state trong onCreate",
    ],
    stages: [
      "Đăng ký JavaScript root và tạo Activity gọi setContent để hiện cùng màn hình Welcome.",
      "Tách AppRoot khỏi file đăng ký hoặc Activity để màn hình không phụ thuộc mã khởi chạy.",
      "Kiểm tra URL hoặc Intent khi mở ứng dụng; chuyển đầu vào không hợp lệ thành trạng thái invalid-link thay vì route tùy ý.",
    ],
  },
  "android-resources": {
    title: "Android resources và bản địa hóa",
    exercise:
      "Hiển thị lời chào và số tin nhắn bằng EN/VI; thay đổi locale, kiểm tra tham số tên, số nhiều và resource mặc định.",
    checklist: [
      "Dùng res/values và res/values-vi với stringResource",
      "Giữ thứ tự từ linh hoạt bằng tham số định dạng",
      "Dùng quantity resource và kiểm tra ít nhất hai số lượng trên từng locale",
    ],
    stages: [
      "Đọc một nhãn đã dịch từ app translator ở React Native và từ stringResource ở Compose.",
      "Chèn tên vào câu đã dịch bằng tham số thay vì ghép các mảnh text.",
      "Hiển thị số tin nhắn bằng quy tắc số nhiều theo locale và kiểm tra trên thiết bị.",
    ],
  },
} as const;
