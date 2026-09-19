export const viFlowTestingConceptTranslations = {
  "flow-composition": {
    title: "Kết hợp và kiểm thử Flow",
    description:
      "Kết hợp bài viết cục bộ với danh sách yêu thích thành dữ liệu hiển thị, phân loại lỗi upstream và kiểm tra emission bằng nguồn dữ liệu có thể điều khiển.",
    implementations: {
      "react-native": {
        name: "Suy ra danh sách từ hai store snapshot",
        summary:
          "React đọc bài viết và mục yêu thích hiện tại, rồi suy ra danh sách hiển thị khi render.",
      },
      kotlin: {
        name: "Kết hợp hai repository Flow",
        summary:
          "Danh sách mới được tạo khi một trong hai nguồn phát giá trị, sau khi cả hai đều có giá trị đầu tiên.",
      },
    },
    relationship:
      "Cả hai suy ra bài viết hiển thị từ bài viết và ID yêu thích. React tính từ snapshot hiện tại khi render; Flow combine chờ từng nguồn phát ít nhất một lần, rồi phản ứng với mỗi nguồn.",
    mentalModel:
      "Giữ phép suy ra dữ liệu là hàm thuần. Kết hợp data source trong repository nếu đó là dữ liệu ứng dụng, rồi expose một stream cho ViewModel. Quyết định rõ khi upstream lỗi: retry, đưa ra error state hay kết thúc stream.",
    differences: [
      "Flow combine chờ emission từ mọi input; React render đọc snapshot hiện tại của từng store đã subscribe.",
      "Flow catch xử lý exception từ upstream rồi kết thúc, trừ khi upstream được retry; nó không tự tiếp tục quan sát database.",
    ],
    commonMistakes: [
      "Chạy các collector riêng và để chúng ghi đè cùng một screen list, gây race condition.",
      "Assert mọi giá trị StateFlow trung gian dù StateFlow gộp các cập nhật nhanh, hoặc nuốt coroutine cancellation như lỗi dữ liệu thường.",
    ],
    productionNotes: [
      "Dùng fake Flow có thể điều khiển để test giá trị đầu, cập nhật từ từng nguồn và chính sách xử lý lỗi; assert StateFlow.value cho screen state hiện tại.",
      "Với stateIn dùng WhileSubscribed, giữ một test collector hoạt động khi kiểm tra cập nhật và hủy nó khi test kết thúc.",
    ],
  },
  "state-owner-testing": {
    title: "Kiểm thử state owner và dữ liệu",
    description:
      "Kiểm tra contract chuyển state bằng fake repository và thời gian coroutine có thể điều khiển trước khi thêm integration test cho database.",
    implementations: {
      "react-native": {
        name: "Test state owner với fake",
        summary:
          "Inject fake data source và assert observable state tiếp theo sau thao tác người dùng.",
      },
      kotlin: {
        name: "Test ViewModel state bằng runTest",
        summary:
          "Fake repository phát dữ liệu có kiểm soát trong khi test dispatcher điều khiển công việc ViewModel.",
      },
    },
    relationship:
      "Cả hai thay repository để test screen state độc lập với network và disk. Kotlin ViewModel test còn cần dispatcher điều khiển được và collector đang hoạt động khi stateIn chỉ chạy lúc có subscriber.",
    mentalModel:
      "Test tại boundary sở hữu state. Fake repository chứng minh contract chuyển state của màn hình; repository integration test riêng chứng minh Room query, mapping và transaction với storage thật.",
    differences: [
      "React Native hook test điều khiển React update bằng act; coroutine test dùng runTest và test dispatcher để điều khiển công việc đã lên lịch và virtual time.",
      "StateFlow expose giá trị hiện tại có thể gộp cập nhật; assert value khi test state cuối, chỉ collect từng emission nếu thứ tự là hành vi cần kiểm tra.",
    ],
    commonMistakes: [
      "Mock mọi method nội bộ khiến test chỉ lặp lại implementation thay vì kiểm tra state contract.",
      "Test stateIn với WhileSubscribed mà không có collector, hoặc dùng delay và dispatcher thật khiến test thiếu ổn định.",
    ],
    productionNotes: [
      "Dùng một test scheduler, thay Dispatchers.Main trong local ViewModel test và để fake data source phát success/failure có kiểm soát.",
      "Thêm Room integration test cho thứ tự query, migration và transaction; fake repository không thể chứng minh SQL đúng.",
    ],
  },
} as const;

export const viFlowTestingRoadmapTranslations = {
  "flow-composition": {
    title: "Kết hợp và kiểm thử Flow",
    exercise:
      "Kết hợp bài viết với ID yêu thích, xử lý lỗi nguồn dữ liệu và test cập nhật từ mỗi nguồn bằng fake Flow.",
    checklist: [
      "Kết quả thay đổi khi một trong hai nguồn thay đổi",
      "Lỗi I/O có chính sách retry hoặc error state rõ",
      "Test giá trị đầu và cập nhật bằng nguồn điều khiển được",
    ],
    stages: [
      "Suy ra danh sách yêu thích từ hai nguồn dữ liệu.",
      "Chọn cách xử lý lỗi upstream và retry có giới hạn.",
      "Test giá trị đầu và cập nhật từ từng nguồn.",
    ],
  },
  "state-owner-testing": {
    title: "Kiểm thử state owner và dữ liệu",
    exercise:
      "Dùng fake repository kiểm tra chuyển state của feed, rồi dùng Room in-memory kiểm tra query thật riêng biệt.",
    checklist: [
      "ViewModel test dùng fake repository và test dispatcher",
      "WhileSubscribed có collector hoạt động trong test",
      "Room query được test bằng database thật",
    ],
    stages: [
      "Assert chuyển state hiển thị bằng fake repository.",
      "Điều khiển emission sau giá trị đầu và giữ subscriber cần thiết.",
      "Tách Room integration test khỏi state-owner unit test.",
    ],
  },
} as const;
