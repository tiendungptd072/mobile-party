export const viComposeRuntimeConceptTranslations = {
  "snapshot-state": {
    title: "Snapshot state có thể quan sát",
    description:
      "Chuyển từ cách cập nhật React state bằng giá trị mới sang state được Compose theo dõi, tránh sửa collection mà UI không nhận biết.",
    implementations: {
      "react-native": {
        name: "Thay mảng trong state",
        summary:
          "Trả về mảng mới để React nhận được giá trị state đã cập nhật.",
      },
      kotlin: {
        name: "Sửa danh sách có thể quan sát",
        summary:
          "SnapshotStateList thông báo các thay đổi cho nơi đọc nó trong Compose.",
      },
    },
    relationship:
      "Cả hai đều giúp UI khai báo nhận biết thay đổi state, nhưng React dựa vào giá trị state mới, còn collection có hỗ trợ snapshot của Compose theo dõi được thao tác sửa chính nó.",
    mentalModel:
      "Chọn state holder có thể quan sát tại nơi sở hữu state. Trong Compose, sửa MutableList thông thường được giữ bằng remember không thông báo cho runtime; hãy thay List bất biến trong MutableState hoặc dùng SnapshotStateList cho thao tác sửa collection cục bộ.",
    differences: [
      "Nên thay mảng trong React state thay vì sửa trực tiếp; Compose SnapshotStateList theo dõi được thao tác thêm và xóa.",
      "Kotlin MutableList thông thường vẫn không được theo dõi, dù remember giữ cùng một instance qua các lần recomposition.",
    ],
    commonMistakes: [
      "Dùng remember { mutableListOf(...) } rồi kỳ vọng thao tác add sẽ cập nhật UI.",
    ],
    productionNotes: [
      "Chỉ công khai dữ liệu UI dạng chỉ đọc ra ngoài state owner; chỉ sửa snapshot state ở nơi owner kiểm soát.",
    ],
  },
  "modifier-order": {
    title: "Thứ tự Modifier và phạm vi tác động",
    description:
      "Hiểu cách thứ tự Modifier trong Compose thay đổi vùng vẽ, khoảng cách và vùng chạm, thay vì xem nó như một style object của React Native.",
    implementations: {
      "react-native": {
        name: "Surface có padding",
        summary: "View style đặt background và padding trên cùng một surface.",
      },
      kotlin: {
        name: "Modifier theo thứ tự",
        summary: "Đặt background trước padding sẽ tô cả vùng bên ngoài.",
      },
    },
    relationship:
      "Style của React Native mô tả một view; từng phần tử trong Compose Modifier bọc phần tử phía sau, nên đổi thứ tự có thể thay đổi vùng vẽ và vùng nhận thao tác chạm.",
    mentalModel:
      "Đọc chuỗi Modifier từ trái sang phải như các lớp bọc quanh nội dung. Chỉ đổi vị trí background hoặc clickable so với padding sau khi xác định padding nằm trong hay ngoài vùng được tô hoặc có thể chạm.",
    differences: [
      "Modifier.background(...).padding(...) tô cả vùng padding; Modifier.padding(...).background(...) để vùng padding ngoài background.",
      "Modifier.clickable(...).padding(...) tính cả padding vào vùng chạm; đảo thứ tự sẽ đổi vùng đó.",
    ],
    commonMistakes: [
      "Đổi thứ tự Modifier chỉ để trình bày code và vô tình thay đổi giao diện hoặc thao tác chạm.",
    ],
    productionNotes: [
      "Kiểm tra vùng hiển thị và vùng chạm bằng UI test, nhất là kích thước chạm tối thiểu và các surface tương tác lồng nhau.",
    ],
  },
  "composition-local": {
    title: "Context và CompositionLocal",
    description:
      "So sánh giá trị ngầm định theo nhánh UI mà không biến CompositionLocal thành cách thay thế việc sở hữu screen state rõ ràng.",
    implementations: {
      "react-native": {
        name: "Cung cấp giá trị spacing",
        summary: "Context provider cung cấp giá trị cho các thành phần con.",
      },
      kotlin: {
        name: "Cung cấp spacing cục bộ",
        summary:
          "CompositionLocalProvider cung cấp giá trị cho nhánh composition của nó.",
      },
    },
    relationship:
      "Cả hai đều cung cấp giá trị cho thành phần con mà không phải truyền qua mọi hàm trung gian, nhưng cách runtime theo dõi và API provider khác nhau.",
    mentalModel:
      "Dùng local cho giá trị dùng xuyên nhiều tầng UI, chẳng hạn design token. Giữ state và event riêng của màn hình dưới dạng tham số tường minh để thấy rõ nơi sở hữu và dependency.",
    differences: [
      "React consumer gọi useContext; Compose consumer đọc LocalSpacing.current trong composition.",
      "Provider lồng nhau chỉ ghi đè giá trị trong nhánh của nó; cả hai không phải nơi lưu trữ bền vững hay owner của screen state.",
    ],
    commonMistakes: [
      "Đưa mọi ViewModel hoặc screen state có thể thay đổi vào CompositionLocal chỉ để khỏi truyền tham số.",
    ],
    productionNotes: [
      "Khai báo local gần provider, mô tả giá trị mặc định và ưu tiên tham số tường minh cho dependency mà chỉ vài composable cần.",
    ],
  },
  recomposition: {
    title: "Render và recomposition",
    description:
      "So sánh quá trình render của React với recomposition của Compose mà không xem chúng là lệnh vẽ lại toàn bộ màn hình.",
    implementations: {
      "react-native": {
        name: "Render từ state",
        summary: "Cập nhật state khiến React lên lịch gọi lại component.",
      },
      kotlin: {
        name: "Recompose từ snapshot state",
        summary:
          "Việc đọc observable state giúp Compose cập nhật các composition scope bị ảnh hưởng.",
      },
    },
    relationship:
      "Cả hai mô tả UI từ state, nhưng React render và Compose recomposition có quy tắc lên lịch, phạm vi và skipping khác nhau.",
    mentalModel:
      "Viết composable như mô tả của state hiện tại. Một state read khiến scope có thể được recompose; điều đó không có nghĩa mọi composable trên màn hình đều phải chạy lại.",
    differences: [
      "Compose theo dõi snapshot-state read trong composition scope; React lên lịch component render khi state cập nhật.",
      "Cả hai runtime đều có thể bỏ qua công việc, nên không dựa vào số lần render hay recompose để chạy business behavior.",
    ],
    commonMistakes: [
      "Khởi chạy network work hoặc sửa external state trực tiếp khi composable đang thực thi.",
    ],
    productionNotes: [
      "Giữ UI function không có side effect và đưa external work vào effect hoặc state owner phù hợp.",
    ],
  },
  "ui-identity": {
    title: "Identity và key của UI",
    description:
      "Dùng identity ổn định để giữ row state và effect khi collection được thêm, xóa hoặc đổi thứ tự.",
    implementations: {
      "react-native": {
        name: "FlatList keyExtractor",
        summary: "Domain ID xác định từng row qua các lần thay đổi thứ tự.",
      },
      kotlin: {
        name: "LazyColumn item key",
        summary: "Key ổn định gắn mỗi item với composition identity của nó.",
      },
    },
    relationship:
      "Cả hai dùng key ổn định để phân biệt item bị đổi thứ tự, nhưng React reconciliation và Compose call-site identity là hai cơ chế khác nhau.",
    mentalModel:
      "Dùng domain identifier ổn định cho từng item lặp lại. Trong Compose, call site cộng với vị trí thực thi xác định identity mặc định; key bổ sung identity khi vị trí có thể đổi.",
    differences: [
      "React key tham gia sibling reconciliation; Compose key giúp nhận diện lần thực thi của một composable call site.",
      "Key chỉ giữ local state khi keyed content còn nằm trong composition hoặc saveable-state scope liên quan.",
    ],
    commonMistakes: [
      "Dùng array index làm key cho item có thể đổi thứ tự, khiến row state đi theo sai item.",
    ],
    productionNotes: [
      "Giữ ID ổn định qua refresh và pagination; kiểm thử thêm, xóa, đổi thứ tự với row-local state.",
    ],
  },
  "state-restoration": {
    title: "Vòng đời và khôi phục state",
    description:
      "Chọn state owner theo recomposition, configuration change, system-initiated process death và durable storage.",
    implementations: {
      "react-native": {
        name: "Local draft state",
        summary:
          "useState giữ bản nháp khi React component instance còn được mount.",
      },
      kotlin: {
        name: "Saveable local draft",
        summary:
          "rememberSaveable còn khôi phục giá trị nhỏ có thể lưu sau các trường hợp Android recreation được hỗ trợ.",
      },
    },
    relationship:
      "useState và rememberSaveable cùng giữ local UI state, nhưng bảo đảm khôi phục và platform lifetime của chúng không tương đương.",
    mentalModel:
      "Dùng remember cho state cục bộ trong composition, rememberSaveable cho UI value nhỏ cần sống qua recreation được hỗ trợ, SavedStateHandle cho input khôi phục do ViewModel sở hữu và repository cho dữ liệu bền vững.",
    differences: [
      "ViewModel sống qua configuration change nhưng bản thân nó không giữ tùy ý mọi field sau process death.",
      "Saved state hỗ trợ khôi phục dữ liệu nhỏ, không phải database hay bảo đảm sau khi người dùng chủ động đóng ứng dụng.",
    ],
    commonMistakes: [
      "Lưu cả response hoặc mutable graph trong Bundle thay vì lưu ID rồi tải lại qua repository.",
    ],
    productionNotes: [
      "Kiểm thử rotation và system-initiated process recreation riêng; giữ saveable payload nhỏ và serializable.",
    ],
  },
  "stability-and-skipping": {
    title: "Stability và skipping",
    description:
      "Hiểu khi nào Compose có thể bỏ qua recomposition và vì sao React.memo chỉ là phép so sánh gần đúng.",
    implementations: {
      "react-native": {
        name: "Memoized row",
        summary:
          "React.memo có thể bỏ qua row render khi props được so sánh là bằng nhau.",
      },
      kotlin: {
        name: "Stable row input",
        summary:
          "Compose có thể bỏ qua lời gọi phù hợp khi input được so sánh là không đổi.",
      },
    },
    relationship:
      "Cả hai có thể tránh UI work dư thừa, nhưng Compose compiler stability và strong-skipping behavior không được điều khiển bằng wrapper tương đương trực tiếp với React.memo.",
    mentalModel:
      "Trước tiên hãy đảm bảo state update đúng và UI function đủ nhẹ. Chỉ tối ưu model stability khi đã đo được vấn đề; compiler setting và parameter stability ảnh hưởng đến skipping.",
    differences: [
      "React.memo so sánh component props; Compose có thể bỏ qua composable call phù hợp theo quy tắc compiler/runtime.",
      "Compose xem collection interface thông thường như List là có thể unstable; chỉ dùng val không chứng minh deep immutability.",
    ],
    commonMistakes: [
      "Thêm @Immutable vào mutable object chỉ để làm stability report biến mất.",
    ],
    productionNotes: [
      "Dùng Compose compiler report và profiling để xác nhận bottleneck; xét strong skipping và compiler version trước khi tối ưu.",
    ],
  },
} as const;

export const viComposeRuntimeRoadmapTranslations = {
  section: "Compose Runtime",
  lessons: {
    "snapshot-state": {
      title: "Snapshot state có thể quan sát",
      exercise:
        "Thêm và xóa tag trên cả hai UI, rồi thay Kotlin MutableList thông thường bằng state holder thực sự thông báo cho Compose.",
      checklist: [
        "Giải thích vì sao chỉ dùng remember không theo dõi thay đổi trong collection",
        "Chủ động chọn thay List bất biến hoặc dùng SnapshotStateList",
      ],
      stages: [
        "Cập nhật số tag hiển thị thông qua state holder có thể quan sát.",
        "Thêm và xóa item mà không sửa collection không được theo dõi.",
        "Giữ thao tác sửa trong state owner và chỉ công khai dữ liệu UI dạng chỉ đọc.",
      ],
    },
    "modifier-order": {
      title: "Thứ tự Modifier và phạm vi tác động",
      exercise:
        "Tạo card và button có padding, rồi đổi thứ tự Modifier để kiểm tra vùng được tô và vùng có thể chạm.",
      checklist: [
        "Dự đoán vùng background trước khi chạy UI",
        "Đưa padding mong muốn vào vùng chạm",
      ],
      stages: [
        "Tô một surface trước khi thêm padding bên trong.",
        "Chủ động đặt padding bên ngoài vùng được tô.",
        "Giữ toàn bộ vùng mong muốn của control có padding ở trạng thái có thể chạm.",
      ],
    },
    "composition-local": {
      title: "Context và CompositionLocal",
      exercise:
        "Cung cấp spacing token cho một nhánh UI, ghi đè ở một nhánh con và giữ screen state tường minh.",
      checklist: [
        "Giải thích phạm vi của provider và consumer",
        "Không giấu screen state hoặc event trong local ngầm định",
      ],
      stages: [
        "Cung cấp và đọc một design token theo nhánh UI.",
        "Chỉ ghi đè token cho một nhánh lồng nhau.",
        "Dùng local cho design context, nhưng truyền giá trị màn hình bằng tham số tường minh.",
      ],
    },
    recomposition: {
      title: "Render và recomposition",
      exercise:
        "Tạo counter và cart summary, rồi xác định state read nào ảnh hưởng từng mô tả UI mà không chạy công việc trong lúc render.",
      checklist: [
        "Giải thích vì sao recomposition không phải lệnh vẽ lại imperative",
        "Giữ external work bên ngoài quá trình thực thi composable",
      ],
      stages: [
        "Dẫn xuất UI từ observable counter state.",
        "Tính giá trị hiển thị từ input hiện tại mà không tạo mutable state trùng lặp.",
        "Collect state có owner tại route boundary và giữ screen rendering thuần.",
      ],
    },
    "ui-identity": {
      title: "Identity và key của UI",
      exercise:
        "Thêm bản nháp cục bộ vào row, đổi thứ tự feed và xác nhận bản nháp theo domain item thay vì vị trí cũ.",
      checklist: [
        "Dùng domain ID ổn định cho row có thể đổi thứ tự",
        "Có thể chủ động reset state khi selected item thay đổi",
      ],
      stages: [
        "Gắn key ổn định từ domain ID cho list row.",
        "Giữ row identity khi sắp xếp hoặc chèn item.",
        "Chủ động reset bản nháp khi item sở hữu nó thay đổi.",
      ],
    },
    "state-restoration": {
      title: "Vòng đời và khôi phục state",
      exercise:
        "Chọn owner cho search draft và profile ID, rồi kiểm thử riêng recomposition, configuration change và system-initiated process recreation.",
      checklist: [
        "Phân biệt remember, rememberSaveable, ViewModel và durable storage",
        "Khôi phục input nhỏ rồi tải lại domain data lớn",
      ],
      stages: [
        "Chỉ giữ bản nháp trong UI instance hoặc composition hiện tại.",
        "Quyết định owner của việc khôi phục rõ ràng thay vì mặc định local state sẽ tồn tại.",
        "Khôi phục ID gọn và lấy dữ liệu mới từ repository.",
      ],
    },
    "stability-and-skipping": {
      title: "Stability và skipping",
      exercise:
        "So sánh React row dùng memo với Compose row nhận value nhỏ; profile trước khi thêm stability annotation.",
      checklist: [
        "Không coi React.memo và Compose skipping là một",
        "Kiểm tra compiler setting và số đo trước khi tối ưu",
      ],
      stages: [
        "Nhận biết khi nào UI call không đổi có thể được bỏ qua.",
        "Truyền value nhỏ cho list row mà không hứa một số lần skip cụ thể.",
        "Giữ correctness độc lập với memoization và chẩn đoán bottleneck đã đo được.",
      ],
    },
  },
} as const;
