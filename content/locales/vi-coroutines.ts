export const viCoroutinesConceptTranslations = {
  "coroutine-scopes": {
    title: "Coroutine scope và cơ chế hủy",
    description:
      "Chuyển từ request React Native phải hủy thủ công sang coroutine có cấu trúc, với owner rõ ràng là màn hình hoặc ViewModel.",
    implementations: {
      "react-native": {
        name: "Hủy request đã bị thay thế",
        summary:
          "AbortController cần được dùng tường minh và signal phải đi đến API hoặc repository thực hiện công việc.",
      },
      kotlin: {
        name: "Gắn công việc với coroutine scope",
        summary:
          "LaunchedEffect hủy rồi khởi động lại child coroutine khi key thay đổi.",
      },
    },
    relationship:
      "Cả hai đều có thể dừng công việc không còn cần thiết, nhưng JavaScript promise không tự nhận cơ chế hủy từ React component; child coroutine của Kotlin thuộc một scope và nhận tín hiệu hủy qua cây Job.",
    mentalModel:
      "Chọn owner trước khi launch: composable effect cho công việc phụ thuộc UI key, viewModelScope cho công việc thuộc screen state, hoặc application scope sống lâu hơn chỉ khi công việc thực sự phải tồn tại sau màn hình. Suspend function tự nó không tạo thread mới.",
    differences: [
      "AbortController chỉ hủy API có quan sát signal; coroutine cancellation truyền tới child Job nhưng công việc blocking hoặc không hỗ trợ hủy vẫn cần hợp tác.",
      "LaunchedEffect khởi động lại khi key đổi hoặc rời composition; viewModelScope tồn tại qua việc Activity được tạo lại do đổi cấu hình nhưng bị hủy khi ViewModel bị xóa.",
      "Suspend function nên an toàn khi gọi từ main thread; tầng thực hiện công việc blocking chọn dispatcher phù hợp thay vì bắt mọi UI caller tự đổi thread.",
    ],
    commonMistakes: [
      "Thay mỗi promise bằng GlobalScope.launch và làm mất owner cũng như khả năng hủy.",
      "Xem CancellationException là lỗi thông thường hoặc hiển thị kết quả cũ sau khi request đã bị hủy nhưng vẫn hoàn tất.",
    ],
    productionNotes: [
      "Ném lại CancellationException khi phải bắt lỗi rộng, và chặn kết quả cũ ở React Native ngay cả khi data source phớt lờ AbortSignal.",
      "Truyền dispatcher vào tầng công việc blocking để test điều khiển được lịch chạy; không làm I/O blocking trên main thread.",
    ],
  },
  "flow-and-stateflow": {
    title: "Flow và StateFlow",
    description:
      "Phân biệt luồng dữ liệu cold với hot screen state và collect StateFlow theo lifecycle của màn hình Android.",
    implementations: {
      "react-native": {
        name: "Đọc snapshot từ external store",
        summary:
          "Store do ứng dụng sở hữu cung cấp snapshot bất biến hiện tại và hàm subscribe có trả về cleanup.",
      },
      kotlin: {
        name: "Collect StateFlow của màn hình",
        summary:
          "ViewModel cung cấp state hiện tại, còn Compose chỉ collect khi lifecycle của màn hình hoạt động.",
      },
    },
    relationship:
      "External store của React và StateFlow đều có thể cung cấp state hiện tại có thể quan sát, nhưng cold Flow chạy lại cho mỗi collector nếu chưa được share; StateFlow là hot và luôn có giá trị hiện tại.",
    mentalModel:
      "Dùng cold Flow cho quy trình chỉ tạo giá trị khi có người collect; dùng StateFlow cho screen state hiện tại. Đặt stateIn trong scope có owner khi một upstream cold cần phục vụ nhiều UI collector, rồi collect kết quả theo lifecycle.",
    differences: [
      "Mỗi lần collect một cold Flow có thể khởi động lại upstream; StateFlow giữ giá trị mới nhất và cần initial state.",
      "React useSyncExternalStore đọc snapshot bất biến được cache; bản thân nó không tạo stream, không sở hữu producer và không lưu state lâu dài.",
      "collectAsStateWithLifecycle dừng collect khi LifecycleOwner xuống dưới STARTED theo mặc định; sharing policy của stateIn điều khiển upstream riêng.",
    ],
    commonMistakes: [
      "Collect cùng một cold network Flow độc lập ở nhiều nơi và vô tình lặp request.",
      "Trả về object mới trong mọi lần gọi getSnapshot hoặc collect Flow trực tiếp trong thân composable.",
    ],
    productionNotes: [
      "Dùng stateIn(viewModelScope, SharingStarted.WhileSubscribed(...), initialState) cho screen state dùng chung khi chính sách vòng đời phù hợp sản phẩm, không xem đó là mặc định cho mọi tình huống.",
      "Mô hình hóa rõ loading, data và failure; dùng producer có thể điều khiển để test emission đầu, việc subscribe lại và hành vi khi lỗi.",
    ],
  },
} as const;

export const viCoroutinesRoadmapTranslations = {
  "coroutine-scopes": {
    title: "Coroutine scope và cơ chế hủy",
    exercise:
      "Tạo màn hình tìm kiếm mà query mới hủy request cũ, kết quả cũ không ghi đè UI, và việc rời màn hình dọn dẹp công việc đúng owner.",
    checklist: [
      "Chọn đúng owner cho công việc theo màn hình hoặc ViewModel",
      "Không biến cancellation thành UI error",
      "Chặn kết quả cũ ngay cả khi data source không tuân thủ hủy",
    ],
    stages: [
      "Gắn một request với React effect hoặc LaunchedEffect và dọn dẹp khi owner kết thúc.",
      "Khi query đổi, hủy công việc cũ và chỉ dùng kết quả của query hiện tại.",
      "Đưa request thuộc screen state vào ViewModel hoặc hook có owner, hủy Job/request cũ và giữ đúng ngữ nghĩa cancellation.",
    ],
  },
  "flow-and-stateflow": {
    title: "Flow và StateFlow",
    exercise:
      "Tạo nguồn trang dữ liệu cold, expose feed state hot cho màn hình, rồi chứng minh nhiều subscriber không tạo request upstream trùng ngoài ý muốn.",
    checklist: [
      "Phân biệt Flow cold với StateFlow hot có giá trị hiện tại",
      "Collect state theo lifecycle và dọn dẹp subscription",
      "Kiểm tra sharing policy, emission đầu và lỗi upstream",
    ],
    stages: [
      "Tạo chuỗi trang lazy và chỉ chạy khi có người consume/collect.",
      "Đọc snapshot hiện tại từ external store hoặc StateFlow trong màn hình.",
      "Share một upstream giữa các subscriber với initial state và policy dừng phù hợp.",
    ],
  },
} as const;
