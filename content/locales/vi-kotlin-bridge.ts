export const viKotlinBridgeConceptTranslations = {
  "null-safety": {
    title: "Null safety",
    description:
      "Chuyển nullable union và optional chaining của TypeScript sang nullable type, safe call và fallback rõ ràng trong Kotlin.",
    implementations: {
      "react-native": {
        name: "Nullable union",
        summary:
          "Union và optional chaining biểu diễn dữ liệu có thể thiếu khi bật strictNullChecks.",
      },
      kotlin: {
        name: "Nullable type",
        summary:
          "Dấu hỏi, safe call và toán tử Elvis xử lý dữ liệu có thể thiếu một cách rõ ràng.",
      },
    },
    relationship:
      "Cả hai type system đều biểu diễn được dữ liệu có thể thiếu, nhưng Kotlin phân biệt nullable và non-null type trên toàn ngôn ngữ; Java interop còn tạo ra platform type.",
    mentalModel:
      "Chỉ ánh xạ T | null | undefined sang T? sau khi xác định ý nghĩa của việc thiếu dữ liệu. Ưu tiên safe call, early return và default rõ ràng; không chuyển non-null assertion của TypeScript thành !! một cách máy móc.",
    differences: [
      "Kotlin chỉ có một giá trị null, trong khi JavaScript phân biệt null và undefined.",
      "Kotlin smart cast giá trị đã kiểm tra khi compiler chứng minh được nó không thay đổi.",
    ],
    commonMistakes: [
      "Dùng !! để làm compiler im lặng thay vì mô hình hóa giá trị optional hoặc validate tại boundary.",
    ],
    productionNotes: [
      "Chuẩn hóa field bị thiếu từ network và persistence tại repository boundary để UI state có nullable contract có chủ đích.",
    ],
  },
  "data-classes": {
    title: "Model bất biến và data class",
    description:
      "So sánh readonly object model của TypeScript với data class, value equality, destructuring và cập nhật bằng copy của Kotlin.",
    implementations: {
      "react-native": {
        name: "Cập nhật readonly object",
        summary:
          "Readonly object được thay bằng một giá trị mới thông qua object spread.",
      },
      kotlin: {
        name: "Data class copy",
        summary:
          "Data class cung cấp value equality và cách cập nhật tạo bản sao.",
      },
    },
    relationship:
      "Cả hai pattern đều tạo giá trị thay thế khi cập nhật state; data class của Kotlin còn sinh value equality, component function và copy.",
    mentalModel:
      "Chuyển immutable TypeScript state object thành Kotlin data class có thuộc tính val. Thay object spread bằng copy, sau đó kiểm tra collection lồng nhau vì val không làm object mutable trở nên deep immutable.",
    differences: [
      "Readonly của TypeScript là ràng buộc structural ở compile time; val của Kotlin ngăn gán lại reference của property.",
      "Data class dùng value equality, còn object equality của JavaScript vẫn dựa trên reference.",
    ],
    commonMistakes: [
      "Cho rằng val MutableList là immutable hoặc so sánh JavaScript object như thể chúng có value equality của data class.",
    ],
    productionNotes: [
      "Expose immutable collection trong UI state và giữ mutation bên trong state holder hoặc repository sở hữu nó.",
    ],
  },
  "sealed-types": {
    title: "Discriminated union và sealed type",
    description:
      "Mô hình hóa tập hợp UI state đóng bằng discriminated union của TypeScript và sealed interface của Kotlin.",
    implementations: {
      "react-native": {
        name: "Discriminated union",
        summary:
          "Literal status field giúp thu hẹp chính xác shape của từng UI state.",
      },
      kotlin: {
        name: "Sealed UI state",
        summary:
          "Sealed hierarchy giúp biểu thức when exhaustive và type-safe.",
      },
    },
    relationship:
      "Cả hai mô hình hóa một họ variant đóng và chỉ expose payload sau khi type đã được thu hẹp exhaustive.",
    mentalModel:
      "Chuyển discriminant field thành sealed hierarchy rồi render bằng when exhaustive. Mỗi variant chỉ nên chứa dữ liệu hợp lệ cho state đó.",
    differences: [
      "Union của TypeScript là structural; sealed subtype của Kotlin được khai báo nominal trong một hierarchy có kiểm soát.",
      "Kotlin when có thể bắt buộc exhaustiveness cho sealed type mà không cần nhánh else.",
    ],
    commonMistakes: [
      "Dùng nhiều boolean rời rạc khiến các tổ hợp bất khả thi như vừa loading vừa success vẫn xuất hiện.",
    ],
    productionNotes: [
      "Tách transient UI effect khỏi screen state bền vững thay vì thêm one-shot event thành sealed-state variant tồn tại lâu dài.",
    ],
  },
  "collection-transforms": {
    title: "Biến đổi collection",
    description:
      "Chuyển JavaScript array pipeline sang Kotlin collection operation mà vẫn giữ đúng thứ tự, nullability và chủ đích cấp phát.",
    implementations: {
      "react-native": {
        name: "Array pipeline",
        summary: "Array method lọc và ánh xạ dữ liệu UI bất biến.",
      },
      kotlin: {
        name: "Collection pipeline",
        summary:
          "Kotlin collection operator biểu diễn cùng thao tác filter và projection.",
      },
    },
    relationship:
      "Từ vựng pipeline khá giống nhau, nhưng Kotlin phân biệt eager collection, lazy sequence, nullable transform và mutable collection interface.",
    mentalModel:
      "Bắt đầu bằng List operation trực tiếp vì rõ ràng và eager. Dùng mapNotNull cho nullable projection, associateBy cho lookup theo key và chỉ dùng Sequence khi pipeline đã đo được lợi ích từ lazy evaluation.",
    differences: [
      "Kotlin có interface collection chỉ đọc và mutable riêng biệt.",
      "Sequence trì hoãn intermediate work, còn List transformation thông thường tạo kết quả eager.",
    ],
    commonMistakes: [
      "Chuyển mọi pipeline sang Sequence mà không xét kích thước collection, số lần lặp lại và terminal operation.",
    ],
    productionNotes: [
      "Thực hiện domain transformation tốn kém bên ngoài composition và expose immutable UI model đã được chuẩn bị.",
    ],
  },
  "lambdas-and-receivers": {
    title: "Lambda và receiver scope",
    description:
      "So sánh callback TypeScript với function type, trailing lambda và receiver-scoped DSL được dùng rộng rãi trong Compose.",
    implementations: {
      "react-native": {
        name: "Typed callback",
        summary: "Function type mô tả giá trị được callback phát ra.",
      },
      kotlin: {
        name: "Function type",
        summary:
          "Function type của Kotlin biểu diễn cùng contract nhận giá trị và trả về Unit.",
      },
    },
    relationship:
      "Cả hai truyền behavior như một giá trị; Kotlin còn dùng receiver function type để giới hạn DSL operation trong scope như RowScope và LazyListScope.",
    mentalModel:
      "Trước tiên ánh xạ JavaScript callback sang Kotlin function type. Sau đó xem receiver lambda như callback có this-like receiver được định kiểu ngầm, không phải một tập Compose function khả dụng toàn cục.",
    differences: [
      "Kotlin dùng Unit thay cho void đối với hàm không trả về giá trị có ý nghĩa.",
      "Receiver scope chỉ làm các API như weight hoặc item khả dụng trong đúng DSL context.",
    ],
    commonMistakes: [
      "Gọi RowScope hoặc LazyListScope extension bên ngoài receiver scope cung cấp chúng.",
    ],
    productionNotes: [
      "Giữ event lambda nhỏ và đặt tên receiver slot theo đúng capability mà caller nhận được.",
    ],
  },
  "extension-functions": {
    title: "Extension function",
    description:
      "Chuyển utility function TypeScript thành Kotlin extension tập trung mà không che giấu ownership, I/O hoặc công việc tốn kém.",
    implementations: {
      "react-native": {
        name: "Utility function",
        summary:
          "Plain function biến đổi domain value mà không thay đổi runtime prototype.",
      },
      kotlin: {
        name: "Extension function",
        summary:
          "Extension bổ sung cú pháp tại call site mà không sửa hoặc kế thừa receiver type.",
      },
    },
    relationship:
      "Kotlin extension vẫn là hàm được resolve tĩnh; nó không thêm member thật và không thay đổi prototype của receiver.",
    mentalModel:
      "Hãy xem extension là utility có namespace với receiver-style syntax. Dùng nó cho behavior thuần, gắn kết; đừng làm network, storage hoặc lifecycle ẩn trông giống một property access rẻ tiền.",
    differences: [
      "Extension được resolve tĩnh từ declared receiver type.",
      "Member function thật luôn được ưu tiên hơn extension có cùng signature.",
    ],
    commonMistakes: [
      "Tạo extension quá rộng trên Any, Context hoặc nullable type khiến dependency bị ẩn và behavior khó khám phá.",
    ],
    productionNotes: [
      "Đặt extension gần domain mà nó làm rõ và kiểm thử mapping extension như một pure function thông thường.",
    ],
  },
  generics: {
    title: "Generic và variance",
    description:
      "So sánh generic contract tái sử dụng của TypeScript với generic, constraint và declaration-site variance của Kotlin.",
    implementations: {
      "react-native": {
        name: "Generic result",
        summary:
          "Type parameter giữ nguyên success payload xuyên qua result contract tái sử dụng.",
      },
      kotlin: {
        name: "Covariant generic result",
        summary:
          "Covariant type parameter cho phép failure không mang success value mà vẫn type-safe.",
      },
    },
    relationship:
      "Cả hai giữ quan hệ giữa input và output type, nhưng Kotlin dùng nominal type cùng quy tắc variance in/out rõ ràng.",
    mentalModel:
      "Chuyển quan hệ type, không chỉ chuyển cú pháp dấu ngoặc nhọn. Thêm constraint khi code cần một capability và chỉ dùng out cho producer hoặc in cho consumer khi API contract thực sự cho phép.",
    differences: [
      "TypeScript dùng structural typing; generic class và interface của Kotlin dùng nominal typing.",
      "Kotlin hỗ trợ declaration-site variance và reified type parameter cho inline function.",
    ],
    commonMistakes: [
      "Thêm star projection hoặc unsafe cast trước khi hiểu generic API đang consume, produce hay làm cả hai với T.",
    ],
    productionNotes: [
      "Ưu tiên generic contract nhỏ, theo domain thay vì wrapper lồng sâu khiến success, absence và failure khó phân biệt.",
    ],
  },
} as const;

export const viKotlinBridgeRoadmapTranslations = {
  section: "Cầu nối Kotlin",
  lessons: {
    "null-safety": {
      title: "Null safety",
      exercise:
        "Chuyển API response và route parameter có thể null từ TypeScript thành Kotlin boundary chỉ expose domain value đã validate.",
      checklist: [
        "Phân biệt dữ liệu bị thiếu với giá trị không hợp lệ",
        "Tránh non-null assertion và Kotlin !!",
      ],
      stages: [
        "Ánh xạ nullable union và optional chaining sang nullable type, safe call và toán tử Elvis.",
        "Validate route hoặc platform input có thể null một lần rồi tiếp tục với local value non-null.",
        "Chuẩn hóa transport data có thể null tại repository boundary thay vì rải defensive check trong UI.",
      ],
    },
    "data-classes": {
      title: "Model bất biến và data class",
      exercise:
        "Chuyển readonly profile model và nested state update của TypeScript thành Kotlin data class cập nhật bằng copy.",
      checklist: [
        "Giải thích được reference equality và value equality",
        "Không nhầm val với deep immutability",
      ],
      stages: [
        "Thay immutable object-spread update bằng lời gọi copy của data class.",
        "Cập nhật state có list lồng nhau mà không mutate model hoặc element trước đó.",
        "Expose read-only UI model và giữ mutable collection sau owner của nó.",
      ],
    },
    "sealed-types": {
      title: "Discriminated union và sealed type",
      exercise:
        "Chuyển sign-in state dạng discriminated union thành sealed hierarchy và render mọi variant exhaustively.",
      checklist: [
        "Chỉ lưu payload hợp lệ trong từng state variant",
        "Xử lý mọi variant mà không dùng catch-all branch",
      ],
      stages: [
        "Biểu diễn state loading hoặc ready đóng bằng union hay sealed interface.",
        "Gắn dữ liệu riêng cho từng variant trong state machine nhỏ thay vì ghép boolean rời rạc.",
        "Render exhaustive để việc thêm state mới tạo ra điểm cần review tại compile time.",
      ],
    },
    "collection-transforms": {
      title: "Biến đổi collection",
      exercise:
        "Chuyển array pipeline parse, filter và index user thành Kotlin collection operation idiomatic.",
      checklist: [
        "Chọn mapNotNull và associateBy có chủ đích",
        "Chỉ dùng Sequence khi laziness mang lại lợi ích thực tế",
      ],
      stages: [
        "Chuyển filter và map quen thuộc mà vẫn giữ đúng thứ tự và type.",
        "Loại kết quả null không hợp lệ và tạo lookup theo key bằng operator rõ ràng.",
        "Kiểm soát intermediate allocation cho pipeline lớn mà không làm transformation đơn giản khó đọc.",
      ],
    },
    "lambdas-and-receivers": {
      title: "Lambda và receiver scope",
      exercise:
        "Chuyển typed callback và builder API thành Kotlin function type, trailing lambda và receiver scope có giới hạn.",
      checklist: [
        "Đọc được Kotlin function type theo cả hai chiều",
        "Biết receiver nào cung cấp scoped API",
      ],
      stages: [
        "Ánh xạ TypeScript callback signature sang Kotlin function type trả về Unit.",
        "Đọc trailing-lambda builder syntax như callback có implicit typed receiver.",
        "Chỉ expose receiver-scoped UI slot khi caller cần capability từ layout scope.",
      ],
    },
    "extension-functions": {
      title: "Extension function",
      exercise:
        "Đưa profile display helper và DTO mapper vào Kotlin extension tập trung nhưng vẫn truyền effectful dependency rõ ràng.",
      checklist: [
        "Hiểu extension được resolve tĩnh",
        "Không che giấu I/O hoặc ownership trong convenience property",
      ],
      stages: [
        "Chuyển utility tập trung sang receiver-style syntax mà không thay đổi receiver class.",
        "Đặt transport-to-domain mapping thuần gần boundary bằng extension.",
        "Truyền dependency rõ ràng khi extension thực hiện suspend hoặc effectful work.",
      ],
    },
    generics: {
      title: "Generic và variance",
      exercise:
        "Chuyển generic paged response và result type mà vẫn giữ đúng constraint và producer variance.",
      checklist: [
        "Giải thích được quan hệ mà mỗi type parameter giữ lại",
        "Chọn in, out hoặc invariance từ behavior thật của API",
      ],
      stages: [
        "Biểu diễn container tái sử dụng bằng một type parameter.",
        "Chỉ thêm constraint khi implementation cần capability như stable ID.",
        "Mô hình hóa producer variance và failure mà không dùng unsafe cast hay wrapper lồng sâu.",
      ],
    },
  },
} as const;
