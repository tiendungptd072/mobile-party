export const viLayoutMechanicsConceptTranslations = {
  "adaptive-layouts": {
    title: "Adaptive layout và kích thước cửa sổ",
    description:
      "Điều chỉnh màn hình theo chiều rộng cửa sổ có sẵn trong split-screen, tablet, foldable và cửa sổ có thể đổi kích thước mà không gắn quyết định UI với tên thiết bị.",
    implementations: {
      "react-native": {
        name: "Phản ứng theo window dimensions",
        summary:
          "Chọn layout từ chiều rộng cửa sổ hiện tại và cập nhật khi cửa sổ đổi kích thước.",
      },
      kotlin: {
        name: "Phản ứng theo window size class",
        summary: "Chọn layout cấp cao từ kích thước cửa sổ hiện có.",
      },
    },
    relationship:
      "Cả hai đều phản ứng theo cửa sổ ứng dụng hiện tại thay vì một mẫu thiết bị cố định, nhưng Compose window size class cung cấp vocabulary breakpoint chung cho quyết định layout cấp cao.",
    mentalModel:
      "Thích ứng với không gian cửa sổ có sẵn, không dùng kiểm tra isTablet. Giữ content và state model ổn định, sau đó chọn layout một pane hoặc hai pane ở ranh giới cấp cao và truyền layout intent xuống dưới.",
    differences: [
      "useWindowDimensions trả về giá trị cửa sổ hiện tại; Compose phân loại chiều rộng và chiều cao có sẵn thành size class có thể thay đổi khi ứng dụng đang chạy.",
      "Window size class không phải device identity: split-screen, xoay màn hình và gập/mở có thể đổi nó trên cùng một thiết bị.",
    ],
    commonMistakes: [
      "Rẽ nhánh sâu theo một kiểm tra width trong nhiều child component, khiến pane có state owner hoặc navigation behavior khác nhau.",
    ],
    productionNotes: [
      "Kiểm tra compact, medium và expanded width cùng compact height; giữ selection và navigation state khi pane xuất hiện hoặc biến mất.",
    ],
  },
  "window-insets": {
    title: "Safe area, system bar và IME inset",
    description:
      "Giữ nội dung mobile có thể thao tác quanh phần khuyết màn hình, system bar và bàn phím khi chuyển từ safe area của React Native sang Compose edge-to-edge.",
    implementations: {
      "react-native": {
        name: "Padding theo safe-area inset",
        summary:
          "Đọc safe-area inset hiện tại và chỉ thêm padding ở cạnh màn hình cần dùng.",
      },
      kotlin: {
        name: "Safe drawing padding",
        summary:
          "Áp dụng Compose safe-drawing inset cho control cần tránh system UI.",
      },
    },
    relationship:
      "Cả hai đều giữ nội dung tránh UI của thiết bị, nhưng React Native thường đọc safe-area value từ provider, còn Compose mô hình hóa system bar, cutout và IME bằng WindowInsets Modifier theo layout.",
    mentalModel:
      "Xem inset là quyết định layout của từng màn hình, không phải padding toàn cục cố định. Hãy để nội dung trang trí vẽ edge-to-edge khi phù hợp, rồi chỉ áp safe inset cho control, nội dung cuộn và text cần luôn có thể thao tác.",
    differences: [
      "React Native SafeAreaView đã deprecated; nên dùng react-native-safe-area-context. Compose có WindowInsets theo kiểu tường minh và các convenience Modifier.",
      "Inset padding Modifier của Compose consume phần inset đã áp dụng để các Modifier inset-aware lồng nhau không cộng cùng khoảng trống hai lần.",
    ],
    commonMistakes: [
      "Áp padding cố định cho status bar hoặc keyboard ở mọi nơi, rồi double-padding Scaffold hoặc để IME che TextField cuối.",
    ],
    productionNotes: [
      "Kiểm tra gesture navigation, display cutout, landscape, IME mở/đóng và Scaffold hoặc navigation chrome lồng nhau trên thiết bị thật.",
    ],
  },
  "layout-constraints": {
    title: "Constraints và kích thước layout",
    description:
      "Chuyển cách đặt kích thước responsive trong React Native sang mô hình parent truyền constraints và child báo kích thước của Compose.",
    implementations: {
      "react-native": {
        name: "Giãn trong parent có padding",
        summary:
          "Child giãn trong phần chiều rộng còn lại sau padding ngang của parent.",
      },
      kotlin: {
        name: "Lấp đầy chiều rộng được cấp",
        summary: "Child lấp đầy chiều rộng có thể dùng sau padding của parent.",
      },
    },
    relationship:
      "Cả hai đều có thể đặt kích thước child theo không gian parent cấp, nhưng Compose truyền min/max constraints xuống cây layout thay vì chuyển trực tiếp từng thuộc tính flex hay phần trăm.",
    mentalModel:
      "Hỏi parent cấp giới hạn nào cho child trước khi chọn size, fillMaxWidth hoặc widthIn. Compose đo child trong giới hạn đó; child báo lại kích thước rồi parent đặt vị trí cho nó.",
    differences: [
      "React Native diễn đạt width, flex và maxWidth qua style; Compose sizing Modifier biến đổi constraints truyền tới child.",
      "Thứ tự Modifier quan trọng: fillMaxWidth đặt trước widthIn có thể ép chiều rộng chính xác mà widthIn phía sau không thu nhỏ được.",
    ],
    commonMistakes: [
      "Nối fillMaxWidth().widthIn(max = ...) rồi kỳ vọng giới hạn max đặt sau sẽ thu nhỏ chiều rộng đã bị ép chính xác.",
    ],
    productionNotes: [
      "Kiểm tra parent hẹp và rộng, text dài và cỡ chữ lớn; giới hạn chiều rộng nội dung trên tablet để layout không giãn quá mức.",
    ],
  },
} as const;

export const viLayoutMechanicsRoadmapTranslations = {
  "adaptive-layouts": {
    title: "Adaptive layout và kích thước cửa sổ",
    exercise:
      "Chuyển mail screen từ một pane sang hai pane khi cửa sổ có thêm không gian, mà không mất message đã chọn.",
    checklist: [
      "Chọn layout từ không gian cửa sổ có sẵn thay vì device identity",
      "Giữ selection và navigation state bên ngoài cách sắp xếp pane",
    ],
    stages: [
      "Chọn list hoặc grid layout theo chiều rộng cửa sổ hiện có.",
      "Hiển thị mail layout một pane hoặc hai pane, nhưng truyền cùng selection state vào cả hai.",
      "Giữ selection trong owner ở cấp route để nó tồn tại khi resize cửa sổ, gập/mở và đổi pane.",
    ],
  },
  "window-insets": {
    title: "Safe area, system bar và IME inset",
    exercise:
      "Giữ header, message composer và feed có thể thao tác khi có cutout, gesture navigation và bàn phím hiển thị.",
    checklist: [
      "Tách nội dung trang trí edge-to-edge khỏi control cần luôn thao tác được",
      "Không áp cùng inset qua cả Scaffold lẫn padding của child",
    ],
    stages: [
      "Thêm padding cho control cấp cao nhất theo vùng safe drawing hiện tại.",
      "Giữ message composer hiển thị khi IME mở và đóng.",
      "Chỉ định một nơi sở hữu inset ở ranh giới màn hình và truyền Scaffold content padding vào nội dung cuộn.",
    ],
  },
  "layout-constraints": {
    title: "Constraints và kích thước layout",
    exercise:
      "Tạo preview cố định, card rộng theo phần trống và nội dung giới hạn chiều rộng trên tablet; giải thích giới hạn mỗi parent truyền cho child.",
    checklist: [
      "Giải thích parent constraints và cách đo child",
      "Đặt widthIn trước fillMaxWidth khi giới hạn chiều rộng nội dung",
    ],
    stages: [
      "Yêu cầu kích thước cố định nhưng vẫn tôn trọng constraints từ parent.",
      "Chỉ lấp đầy chiều rộng còn lại bên trong padding của parent.",
      "Lấp đầy màn hình hẹp, đồng thời giới hạn và căn giữa nội dung trên màn hình rộng.",
    ],
  },
} as const;
