import type { LearningEntryGuide } from "@/types/learning-entry";

export const viReactNativeToKotlinEntry = {
  title: "Chọn điểm bắt đầu",
  introduction:
    "Chỉ chọn 'Tôi tự làm được' nếu bạn làm được bài kiểm tra bên dưới mà không xem ví dụ. Thâm niên React Native không tự quyết định điểm bắt đầu với Android; bài thực hành đầu ra mới cho thấy bạn đã tiến bộ đến đâu.",
  answerYes: "Tôi tự làm được",
  answerNo: "Tôi cần luyện thêm",
  incomplete: "Trả lời cả bốn câu để nhận gợi ý tuyến học.",
  recommendation: "Tuyến học gợi ý",
  viewPath: "Xem tuyến học này",
  pathsTitle: "Tuyến học và tiêu chí hoàn thành",
  lessonsLabel: "Bắt đầu với các bài này, theo thứ tự",
  prerequisiteLabel: "Trước khi bắt đầu",
  milestoneLabel: "Bài thực hành đầu ra",
  rubricLabel: "Minh chứng hoàn thành",
  availabilityTitle: "Nội dung hiện có",
  futureContentNote:
    "Các bài học được liên kết đã có trên website. Dự án Android chạy được và các module nền tảng nâng cao sẽ được bổ sung ở giai đoạn sau; những bài thực hành dưới đây là mục tiêu, không phải chứng chỉ do website cấp.",
  modulesTitle: "Điều kiện vào module và cách bỏ qua phần đã biết",
  moduleCheckLabel: "Bài kiểm tra trước khi bỏ qua",
  skipGuidance:
    "Nếu bạn làm được bài kiểm tra của module mà không xem ví dụ, có thể đọc lướt mức Cơ bản và Áp dụng rồi tập trung vào Production. Chỉ đánh dấu bài hoàn thành sau khi làm bài thực hành.",
  questions: [
    {
      id: "kotlin",
      title: "Chuyển sang ngôn ngữ Kotlin",
      proof:
        "Chuyển một API model có thể null thành Kotlin data class và sealed UI state mà không dùng !!.",
    },
    {
      id: "compose",
      title: "State và vòng đời trong Compose",
      proof:
        "Giải thích search draft nên đặt trong remember, rememberSaveable hay ViewModel khi xoay màn hình và khi process được tạo lại.",
    },
    {
      id: "async",
      title: "Dữ liệu bất đồng bộ và hủy tác vụ",
      proof:
        "Hủy request đã lỗi thời và hiển thị loading, lỗi, thử lại, thành công từ state holder dùng repository.",
    },
    {
      id: "architecture",
      title: "Ranh giới tính năng và kiểm thử",
      proof:
        "Giải thích trách nhiệm của UI, ViewModel, repository và kiểm thử một lần chuyển state bằng fake data source.",
    },
  ],
  paths: [
    {
      level: "junior",
      title: "Tuyến Android Junior",
      audience:
        "Bắt đầu ở đây nếu bạn vẫn cần ví dụ để hiểu Kotlin hoặc state và vòng đời trong Compose.",
      prerequisite:
        "Bạn làm được một màn hình React Native và hiểu props, local state, navigation.",
      lessonSlugs: [
        "null-safety",
        "data-classes",
        "sealed-types",
        "android-build-variants",
        "android-app-entry",
        "android-resources",
        "android-intents",
        "android-activity-lifecycle",
        "component",
        "local-state",
        "state-restoration",
        "text-input",
        "form",
        "navigation",
        "ui-behavior-testing",
      ],
      milestone:
        "Xây một tính năng Android có hai màn hình, input được kiểm tra, local state, navigation và UI behavior test.",
      rubric: [
        "Thao tác của người dùng cho cùng kết quả hiển thị sau khi quay lại màn hình.",
        "Giải thích được ai sở hữu state và cách khôi phục sau xoay màn hình hoặc tạo lại process.",
        "UI test thực hiện một thao tác và kiểm tra kết quả hiển thị.",
      ],
    },
    {
      level: "middle",
      title: "Tuyến Android Middle",
      audience:
        "Bắt đầu ở đây nếu đã quen Kotlin và Compose cơ bản nhưng cần luyện data flow hoặc testing.",
      prerequisite:
        "Làm được hai bài tự đánh giá về Kotlin và Compose, hoặc hoàn thành bài thực hành Junior.",
      lessonSlugs: [
        "snapshot-state",
        "global-state",
        "repository-boundary",
        "dependency-injection",
        "offline-first-data",
        "offline-pagination",
        "durable-background-work",
        "android-notifications",
        "async",
        "coroutine-scopes",
        "flow-and-stateflow",
        "flow-composition",
        "state-owner-testing",
        "navigation-testing",
        "background-work-testing",
        "error-handling",
        "api-request",
        "pagination",
        "local-storage",
        "authentication",
      ],
      milestone:
        "Triển khai danh sách lấy dữ liệu qua repository, có loading, thử lại, phân trang, lưu cục bộ và test các lần chuyển state.",
      rubric: [
        "Screen state có một nơi sở hữu rõ ràng; UI tái sử dụng không phụ thuộc chi tiết transport.",
        "Hủy tác vụ, chặn request trùng và thử lại vẫn giữ dữ liệu hiển thị đúng.",
        "Kiểm thử repository và ViewModel bằng data source có thể điều khiển.",
      ],
    },
    {
      level: "senior",
      title: "Tuyến Android Senior",
      audience:
        "Bắt đầu ở đây nếu bạn đã tự xây và kiểm thử được một tính năng Compose hoàn chỉnh.",
      prerequisite:
        "Làm được cả bốn bài tự đánh giá; xem lại bài thực hành Middle nếu data layer vẫn chưa quen.",
      lessonSlugs: [
        "state-restoration",
        "stability-and-skipping",
        "adaptive-layouts",
        "deep-link",
        "secure-storage",
        "ui-behavior-testing",
      ],
      milestone:
        "Review và cải thiện một tính năng về khôi phục state, sở hữu dữ liệu, deep link, bảo mật, test và hiệu năng đã đo.",
      rubric: [
        "Ghi rõ lựa chọn kiến trúc và trade-off dựa trên ràng buộc thực tế.",
        "Tái hiện và kiểm thử tình huống lỗi, tạo lại process và điều hướng.",
        "Thay đổi hiệu năng có số đo trước/sau, không dựa vào phỏng đoán.",
      ],
    },
  ],
  modules: [
    {
      sectionId: "kotlin-bridge",
      prerequisite: "Biết mô hình hóa dữ liệu và viết hàm trong TypeScript.",
      check:
        "Chuyển response có thể null thành Kotlin data class và sealed state mà không dùng !!.",
      lessonSlug: "null-safety",
    },
    {
      sectionId: "compose-runtime",
      prerequisite: "Nắm cầu nối Kotlin và dựng được màn hình Compose cơ bản.",
      check:
        "Chọn đúng nơi sở hữu state qua recomposition, xoay màn hình và tạo lại process.",
      lessonSlug: "state-restoration",
    },
    {
      sectionId: "ui-basics",
      prerequisite: "Biết hàm, nullability trong Kotlin và cú pháp composable.",
      check:
        "Dựng màn hình có UI tái sử dụng, ràng buộc kích thước và key ổn định cho list.",
      lessonSlug: "layout-constraints",
    },
    {
      sectionId: "state",
      prerequisite: "Biết tách Compose content và truyền event callback.",
      check:
        "Hoist state và giải thích khi nào nên dẫn xuất một giá trị thay vì lưu nó.",
      lessonSlug: "derived-state",
    },
    {
      sectionId: "lifecycle",
      prerequisite:
        "Hiểu nơi sở hữu state và phân biệt render với recomposition.",
      check:
        "Đăng ký external source và gỡ đăng ký khi nơi sở hữu rời vòng đời.",
      lessonSlug: "lifecycle",
    },
    {
      sectionId: "forms",
      prerequisite:
        "Biết state, callback và tác vụ bất đồng bộ có vòng đời rõ ràng.",
      check:
        "Kiểm tra input, chặn submit trùng và giữ được đường phục hồi khi lỗi.",
      lessonSlug: "form",
    },
    {
      sectionId: "navigation",
      prerequisite:
        "Biết nơi sở hữu screen state và dựng luồng Compose hai màn hình.",
      check:
        "Truyền ID qua route và tải dữ liệu hiện tại đã được cấp quyền ở màn hình đích.",
      lessonSlug: "route-parameters",
    },
    {
      sectionId: "async-networking",
      prerequisite:
        "Biết suspend function, ViewModel và screen state trong Kotlin.",
      check:
        "Hủy tác vụ cũ và hiển thị loading, lỗi, thử lại, thành công mà không dùng kết quả lỗi thời.",
      lessonSlug: "async",
    },
    {
      sectionId: "storage",
      prerequisite:
        "Hiểu repository và mô hình hóa loading/error state rõ ràng.",
      check:
        "Lưu một preference nhỏ và phục hồi khi dữ liệu đã lưu thiếu hoặc sai định dạng.",
      lessonSlug: "local-storage",
    },
    {
      sectionId: "app-architecture",
      prerequisite:
        "Biết navigation, dữ liệu bất đồng bộ và lưu trữ do repository sở hữu.",
      check:
        "Giải thích session gate và kiểm thử một lần chuyển trạng thái hiển thị bằng fake dependency.",
      lessonSlug: "authentication",
    },
  ],
} satisfies LearningEntryGuide;
