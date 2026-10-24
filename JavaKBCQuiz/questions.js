/**
 * NPTEL Java KBC Quiz Game - Question Bank
 * Contains 120 verified questions categorized across 12 syllabus sections.
 */

const TOPICS = [
  {
    id: 1,
    name: "Java Basics and JVM",
    description: "History, JVM architecture, bytecode, compilation & execution commands",
    startId: 1,
    endId: 10
  },
  {
    id: 2,
    name: "OOP Fundamentals",
    description: "Classes, objects, encapsulation, abstraction, inheritance & polymorphism",
    startId: 11,
    endId: 20
  },
  {
    id: 3,
    name: "Java Programming Elements",
    description: "Primitives, default values, increment operators, loops & array indexing",
    startId: 21,
    endId: 30
  },
  {
    id: 4,
    name: "Classes and Encapsulation",
    description: "Constructors, this/super, static keywords, and access level modifiers",
    startId: 31,
    endId: 40
  },
  {
    id: 5,
    name: "Inheritance and Polymorphism",
    description: "Extends keyword, overriding, overloading, dynamic method dispatch & final",
    startId: 41,
    endId: 50
  },
  {
    id: 6,
    name: "Interfaces and Packages",
    description: "Interface contracts, multiple inheritance, package scoping & defaults",
    startId: 51,
    endId: 60
  },
  {
    id: 7,
    name: "Exception Handling",
    description: "Try, catch, finally, throw, throws, checked vs unchecked exceptions",
    startId: 61,
    endId: 70
  },
  {
    id: 8,
    name: "Multithreading",
    description: "Thread class, Runnable interface, synchronization, lifecycle & deadlocks",
    startId: 71,
    endId: 80
  },
  {
    id: 9,
    name: "Input/Output and Strings",
    description: "Byte vs character streams, Scanner, immutability & StringBuilder",
    startId: 81,
    endId: 90
  },
  {
    id: 10,
    name: "Applets, Servlets, AWT and Swing",
    description: "GUI architecture, event listeners, layout managers, AWT vs Swing",
    startId: 91,
    endId: 100
  },
  {
    id: 11,
    name: "Networking and JDBC",
    description: "Sockets, ServerSockets, JDBC drivers, PreparedStatement & ResultSet",
    startId: 101,
    endId: 110
  },
  {
    id: 12,
    name: "Mixed Output-Based Questions",
    description: "Operator precedence, string concatenation quirks, loops & GC fundamentals",
    startId: 111,
    endId: 120
  }
];

const IMPORTANT_QUESTION_IDS = [
  1, 6, 9, 11, 14, 15, 16, 19, 20, 21, 22, 23, 24, 25, 26, 30, 31, 32, 33, 36,
  38, 40, 41, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
  61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81,
  82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104,
  105, 106, 107, 108, 109, 110, 111, 112, 113, 117, 118, 119, 120
];

const QUESTIONS_DATA = [
  // Section 1 — Java Basics and JVM (Q1–10)
  {
    id: 1,
    topic: "Java Basics and JVM",
    question: "Who developed Java?",
    options: {
      A: "Dennis Ritchie",
      B: "James Gosling",
      C: "Bjarne Stroustrup",
      D: "Guido van Rossum"
    },
    correctAnswer: "B",
    explanation: "Java was initiated by James Gosling, Mike Sheridan, and Patrick Naughton at Sun Microsystems in 1991.",
    hint: "He is widely celebrated as the father of the Java programming language."
  },
  {
    id: 2,
    topic: "Java Basics and JVM",
    question: "What does JVM stand for?",
    options: {
      A: "Java Variable Machine",
      B: "Java Virtual Machine",
      C: "Java Verified Method",
      D: "Java Visual Machine"
    },
    correctAnswer: "B",
    explanation: "JVM stands for Java Virtual Machine, the runtime engine that loads, verifies, and executes Java bytecode.",
    hint: "The second word describes something simulated in software rather than hardware."
  },
  {
    id: 3,
    topic: "Java Basics and JVM",
    question: "Why is Java platform-independent?",
    options: {
      A: "It uses only machine code",
      B: "It uses bytecode executed by a compatible JVM",
      C: "It does not require compilation",
      D: "It runs only on Windows"
    },
    correctAnswer: "B",
    explanation: "Java source code is compiled into universal bytecode (.class), which runs on any OS having an appropriate JVM.",
    hint: "Recall the famous slogan: 'Write Once, Run Anywhere' (WORA)."
  },
  {
    id: 4,
    topic: "Java Basics and JVM",
    question: "Which file contains Java bytecode?",
    options: {
      A: ".java",
      B: ".exe",
      C: ".class",
      D: ".txt"
    },
    correctAnswer: "C",
    explanation: "When you compile a .java source file using javac, it generates bytecode stored in .class files.",
    hint: "It shares the same extension name as the keyword used to define objects' blueprints."
  },
  {
    id: 5,
    topic: "Java Basics and JVM",
    question: "Which command compiles a Java source file?",
    options: {
      A: "java",
      B: "javac",
      C: "jvm",
      D: "compile"
    },
    correctAnswer: "B",
    explanation: "The 'javac' command invokes the Java compiler to compile source code (.java) into bytecode (.class).",
    hint: "The command name combines 'java' with the first letter of 'compiler'."
  },
  {
    id: 6,
    topic: "Java Basics and JVM",
    question: "Which command runs a compiled Java class?",
    options: {
      A: "javac Main",
      B: "run Main.java",
      C: "java Main",
      D: "execute Main"
    },
    correctAnswer: "C",
    explanation: "The 'java' command starts the JVM and runs the specified compiled class by invoking its main method.",
    hint: "Use the plain language name followed by the class name without file extensions."
  },
  {
    id: 7,
    topic: "Java Basics and JVM",
    question: "Which is NOT a standard Java feature?",
    options: {
      A: "Object-oriented",
      B: "Platform-independent bytecode",
      C: "Direct pointer arithmetic like C",
      D: "Multithreading support"
    },
    correctAnswer: "C",
    explanation: "Java explicitly removes direct pointer manipulation and pointer arithmetic to guarantee memory safety and security.",
    hint: "Java avoids memory addresses calculations common in C and C++."
  },
  {
    id: 8,
    topic: "Java Basics and JVM",
    question: "What is JDK?",
    options: {
      A: "Java Development Kit",
      B: "Java Data Kernel",
      C: "Java Design Key",
      D: "Java Debug Kernel"
    },
    correctAnswer: "A",
    explanation: "JDK (Java Development Kit) includes the compiler (javac), documentation tools, and JRE for developing Java apps.",
    hint: "It is the full kit necessary for software development in Java."
  },
  {
    id: 9,
    topic: "Java Basics and JVM",
    question: "Which component converts Java source code into bytecode?",
    options: {
      A: "JVM",
      B: "Java compiler",
      C: "Garbage collector",
      D: "Class loader"
    },
    correctAnswer: "B",
    explanation: "The Java compiler (javac) transforms human-readable Java code into intermediate bytecode instructions.",
    hint: "The tool that checks syntax and translates source files into .class files."
  },
  {
    id: 10,
    topic: "Java Basics and JVM",
    question: "Which method is the standard entry point of a Java application?",
    options: {
      A: "start()",
      B: "run()",
      C: "public static void main(String[] args)",
      D: "init()"
    },
    correctAnswer: "C",
    explanation: "public static void main(String[] args) is the predefined signature where JVM initiates standalone program execution.",
    hint: "Look for the method taking an array of String arguments."
  },

  // Section 2 — OOP Fundamentals (Q11–20)
  {
    id: 11,
    topic: "OOP Fundamentals",
    question: "What is a class?",
    options: {
      A: "An instance of an object",
      B: "A blueprint for creating objects",
      C: "A loop",
      D: "A package"
    },
    correctAnswer: "B",
    explanation: "A class acts as a template or blueprint that describes the fields and methods created objects will have.",
    hint: "Think of an architectural plan used to construct multiple real buildings."
  },
  {
    id: 12,
    topic: "OOP Fundamentals",
    question: "What is an object?",
    options: {
      A: "An instance of a class",
      B: "A method only",
      C: "A keyword",
      D: "A compiler"
    },
    correctAnswer: "A",
    explanation: "An object is a tangible runtime realization (instance) of a class having identity, state, and behavior.",
    hint: "It is the concrete entity created in heap memory from a blueprint."
  },
  {
    id: 13,
    topic: "OOP Fundamentals",
    question: "Which are the four commonly taught pillars of OOP?",
    options: {
      A: "Looping, branching, arrays, strings",
      B: "Encapsulation, abstraction, inheritance, polymorphism",
      C: "JVM, JDK, JRE, compiler",
      D: "Input, output, processing, storage"
    },
    correctAnswer: "B",
    explanation: "The core foundational pillars of Object-Oriented Programming are Encapsulation, Abstraction, Inheritance, and Polymorphism.",
    hint: "Remember the well-known acronym: APIE or EAIP."
  },
  {
    id: 14,
    topic: "OOP Fundamentals",
    question: "Wrapping data and methods together in one unit is called:",
    options: {
      A: "Inheritance",
      B: "Encapsulation",
      C: "Compilation",
      D: "Iteration"
    },
    correctAnswer: "B",
    explanation: "Encapsulation binds data variables and the methods that operate on them within a single class unit.",
    hint: "Like placing medicine inside a protective capsule."
  },
  {
    id: 15,
    topic: "OOP Fundamentals",
    question: "Hiding implementation details and exposing essential features is called:",
    options: {
      A: "Abstraction",
      B: "Inheritance",
      C: "Overloading",
      D: "Instantiation"
    },
    correctAnswer: "A",
    explanation: "Abstraction simplifies complexity by showing only essential operations to the user and concealing the internal workings.",
    hint: "Focusing on 'what an object does' rather than 'how it works'."
  },
  {
    id: 16,
    topic: "OOP Fundamentals",
    question: "Reusing properties of an existing class is called:",
    options: {
      A: "Casting",
      B: "Inheritance",
      C: "Encapsulation",
      D: "Compilation"
    },
    correctAnswer: "B",
    explanation: "Inheritance enables a subclass to derive properties and methods from a superclass, fostering high code reusability.",
    hint: "Just like offspring inheriting characteristics from their parents."
  },
  {
    id: 17,
    topic: "OOP Fundamentals",
    question: "One interface or method name showing different behaviours is related to:",
    options: {
      A: "Polymorphism",
      B: "Encapsulation",
      C: "Garbage collection",
      D: "Packages"
    },
    correctAnswer: "A",
    explanation: "Polymorphism (meaning 'many forms') allows different classes to respond differently to the same method invocation.",
    hint: "Derived from Greek roots meaning 'many' and 'shape/form'."
  },
  {
    id: 18,
    topic: "OOP Fundamentals",
    question: "Which OOP concept protects data using access control?",
    options: {
      A: "Encapsulation",
      B: "Looping",
      C: "Networking",
      D: "Threading"
    },
    correctAnswer: "A",
    explanation: "Encapsulation protects class members by declaring fields private and exposing controlled public getters and setters.",
    hint: "Pairing private fields with public accessors."
  },
  {
    id: 19,
    topic: "OOP Fundamentals",
    question: "Which operator creates an object in Java?",
    options: {
      A: "create",
      B: "new",
      C: "object",
      D: "this"
    },
    correctAnswer: "B",
    explanation: "The 'new' operator allocates memory dynamically on the heap and invokes the constructor to initialize the object.",
    hint: "A three-letter keyword used before calling a class constructor."
  },
  {
    id: 20,
    topic: "OOP Fundamentals",
    question: "Which statement about Java is correct?",
    options: {
      A: "Java supports multiple inheritance of classes",
      B: "Java does not support inheritance",
      C: "Java supports multiple inheritance of type through interfaces",
      D: "Java does not support polymorphism"
    },
    correctAnswer: "C",
    explanation: "Java prevents multiple class inheritance to prevent ambiguity, but allows a class to implement multiple interfaces.",
    hint: "Classes can implement multiple interfaces, but only extend one class."
  },

  // Section 3 — Java Programming Elements (Q21–30)
  {
    id: 21,
    topic: "Java Programming Elements",
    question: "Which is a primitive data type in Java?",
    options: {
      A: "String",
      B: "Integer",
      C: "int",
      D: "Scanner"
    },
    correctAnswer: "C",
    explanation: "'int' is one of the 8 built-in primitives. String and Scanner are reference classes, and Integer is a wrapper class.",
    hint: "The keyword is written entirely in lowercase."
  },
  {
    id: 22,
    topic: "Java Programming Elements",
    question: "What is the default value of an instance variable of type int?",
    options: {
      A: "1",
      B: "-1",
      C: "0",
      D: "null"
    },
    correctAnswer: "C",
    explanation: "Instance and static numeric variables in Java are automatically initialized to 0 by default.",
    hint: "The baseline numeric value representing zero."
  },
  {
    id: 23,
    topic: "Java Programming Elements",
    question: "What is the default value of a reference-type instance variable?",
    options: {
      A: "0",
      B: "false",
      C: "An empty object",
      D: "null"
    },
    correctAnswer: "D",
    explanation: "Any uninitialized reference-type instance variable defaults to null, indicating that it references no heap object.",
    hint: "The special literal meaning 'points to nothing'."
  },
  {
    id: 24,
    topic: "Java Programming Elements",
    question: "What is the output?\nint a = 5;\nSystem.out.println(a++);",
    options: {
      A: "4",
      B: "5",
      C: "6",
      D: "Compilation error"
    },
    correctAnswer: "B",
    explanation: "Post-increment (a++) evaluates and supplies the original value (5) to the print statement before incrementing 'a' to 6.",
    hint: "Post-increment uses the value first, then adds 1."
  },
  {
    id: 25,
    topic: "Java Programming Elements",
    question: "What is the output?\nint a = 5;\nSystem.out.println(++a);",
    options: {
      A: "5",
      B: "6",
      C: "4",
      D: "Error"
    },
    correctAnswer: "B",
    explanation: "Pre-increment (++a) increments 'a' from 5 to 6 first, and then returns the newly incremented value.",
    hint: "The ++ comes before the variable, so increment happens immediately."
  },
  {
    id: 26,
    topic: "Java Programming Elements",
    question: "What is the output?\nSystem.out.println(10 / 3);",
    options: {
      A: "3.33",
      B: "3",
      C: "4",
      D: "Error"
    },
    correctAnswer: "B",
    explanation: "Both 10 and 3 are integers, so Java performs integer division, discarding fractional remainders to yield 3.",
    hint: "Integer divided by integer yields an integer result with no decimal part."
  },
  {
    id: 27,
    topic: "Java Programming Elements",
    question: "Which loop executes its body at least once, assuming normal completion?",
    options: {
      A: "for",
      B: "while",
      C: "do-while",
      D: "Enhanced for"
    },
    correctAnswer: "C",
    explanation: "The do-while loop evaluates its boolean condition after the loop body executes, ensuring at least one pass.",
    hint: "An exit-controlled loop structure."
  },
  {
    id: 28,
    topic: "Java Programming Elements",
    question: "What is the index of the first element in a Java array?",
    options: {
      A: "-1",
      B: "0",
      C: "1",
      D: "Depends on the array size"
    },
    correctAnswer: "B",
    explanation: "Java arrays use 0-based indexing; the initial element is always accessed at index [0].",
    hint: "Java indexing begins with zero."
  },
  {
    id: 29,
    topic: "Java Programming Elements",
    question: "What is the output?\nint[] a = {10, 20, 30};\nSystem.out.println(a.length);",
    options: {
      A: "2",
      B: "3",
      C: "30",
      D: "Error"
    },
    correctAnswer: "B",
    explanation: "The array 'a' contains three initialized elements, so the length field equals 3.",
    hint: "Count how many elements are enclosed in the curly brackets."
  },
  {
    id: 30,
    topic: "Java Programming Elements",
    question: "What happens when you access an invalid array index at runtime?",
    options: {
      A: "The array expands automatically",
      B: "Java returns zero",
      C: "ArrayIndexOutOfBoundsException is thrown",
      D: "The program always prints null"
    },
    correctAnswer: "C",
    explanation: "Accessing an index < 0 or >= array.length causes the JVM to throw ArrayIndexOutOfBoundsException.",
    hint: "Java performs strict runtime bounds checking."
  },

  // Section 4 — Classes and Encapsulation (Q31–40)
  {
    id: 31,
    topic: "Classes and Encapsulation",
    question: "What is a constructor?",
    options: {
      A: "A method that must return int",
      B: "A special class member used to initialize objects",
      C: "A package",
      D: "A loop"
    },
    correctAnswer: "B",
    explanation: "A constructor initializes newly instantiated objects and shares the exact name of the enclosing class.",
    hint: "It constructs and initializes object state during 'new'."
  },
  {
    id: 32,
    topic: "Classes and Encapsulation",
    question: "Does a constructor have a return type?",
    options: {
      A: "Yes, always void",
      B: "Yes, always int",
      C: "No",
      D: "Only if it is public"
    },
    correctAnswer: "C",
    explanation: "Constructors never specify a return type, not even void. Specifying a return type turns it into an ordinary method.",
    hint: "If you add 'void' or any return type, it is treated as a regular method."
  },
  {
    id: 33,
    topic: "Classes and Encapsulation",
    question: "What is constructor overloading?",
    options: {
      A: "Creating multiple constructors with different parameter lists",
      B: "Overriding a constructor in a subclass",
      C: "Creating multiple packages",
      D: "Calling a method recursively"
    },
    correctAnswer: "A",
    explanation: "Constructor overloading occurs when a class provides two or more constructors with distinct parameter signatures.",
    hint: "Same constructor name, varying parameter types or counts."
  },
  {
    id: 34,
    topic: "Classes and Encapsulation",
    question: "Which keyword refers to the current object?",
    options: {
      A: "super",
      B: "this",
      C: "static",
      D: "final"
    },
    correctAnswer: "B",
    explanation: "'this' is an implicit reference variable pointing to the current object instance executing the method or constructor.",
    hint: "Pronoun referring to the object itself."
  },
  {
    id: 35,
    topic: "Classes and Encapsulation",
    question: "Which keyword accesses superclass members or constructors?",
    options: {
      A: "this",
      B: "super",
      C: "extends",
      D: "private"
    },
    correctAnswer: "B",
    explanation: "'super' allows a subclass to invoke constructors, methods, and variables of its parent/superclass.",
    hint: "Refers upward in the inheritance hierarchy."
  },
  {
    id: 36,
    topic: "Classes and Encapsulation",
    question: "Which keyword declares a class-level member shared by the class rather than each instance?",
    options: {
      A: "static",
      B: "final",
      C: "volatile",
      D: "transient"
    },
    correctAnswer: "A",
    explanation: "Static variables and methods belong to the class itself, maintaining only one copy shared among all instances.",
    hint: "Shared across all objects without creating an instance."
  },
  {
    id: 37,
    topic: "Classes and Encapsulation",
    question: "Which access modifier provides the most restrictive ordinary access?",
    options: {
      A: "public",
      B: "protected",
      C: "Default access",
      D: "private"
    },
    correctAnswer: "D",
    explanation: "'private' limits visibility strictly to code within the same enclosing class declaration.",
    hint: "Kept confidential to the class only."
  },
  {
    id: 38,
    topic: "Classes and Encapsulation",
    question: "Which access modifier permits access from any class, subject to module and other language restrictions?",
    options: {
      A: "private",
      B: "public",
      C: "Default access",
      D: "protected only"
    },
    correctAnswer: "B",
    explanation: "'public' grants access to members from any class across packages and modules.",
    hint: "The opposite of private; open to everyone."
  },
  {
    id: 39,
    topic: "Classes and Encapsulation",
    question: "What is the output?\nclass Test {\n  static int x = 10;\n  public static void main(String[] args) {\n    Test a = new Test();\n    Test b = new Test();\n    a.x = 20;\n    System.out.println(b.x);\n  }\n}",
    options: {
      A: "10",
      B: "20",
      C: "0",
      D: "Error"
    },
    correctAnswer: "B",
    explanation: "Because 'x' is static, only one copy exists for the class. Modifying a.x changes the shared variable, so b.x reflects 20.",
    hint: "Static variables share a single memory location across all objects."
  },
  {
    id: 40,
    topic: "Classes and Encapsulation",
    question: "What does information hiding mean?",
    options: {
      A: "Deleting data",
      B: "Restricting direct access to internal implementation details",
      C: "Hiding source code from the compiler",
      D: "Removing all methods"
    },
    correctAnswer: "B",
    explanation: "Information hiding shields internal data structures from external tampering by restricting direct variable access.",
    hint: "Encapsulation concept that conceals internal state."
  },

  // Section 5 — Inheritance and Polymorphism (Q41–50)
  {
    id: 41,
    topic: "Inheritance and Polymorphism",
    question: "Which keyword is used for class inheritance?",
    options: {
      A: "implements",
      B: "extends",
      C: "inherits",
      D: "super"
    },
    correctAnswer: "B",
    explanation: "In Java, a class inherits from a base class using the 'extends' keyword (e.g., class Dog extends Animal).",
    hint: "Signifies expanding upon a base class."
  },
  {
    id: 42,
    topic: "Inheritance and Polymorphism",
    question: "Which inheritance type is not directly supported by Java classes?",
    options: {
      A: "Single",
      B: "Multilevel",
      C: "Hierarchical",
      D: "Multiple inheritance from multiple classes"
    },
    correctAnswer: "D",
    explanation: "Java does not permit a class to extend more than one direct parent class to prevent the diamond problem.",
    hint: "A class cannot have two direct superclasses."
  },
  {
    id: 43,
    topic: "Inheritance and Polymorphism",
    question: "What is method overloading?",
    options: {
      A: "Same method name with different parameter lists",
      B: "Same method signature in a subclass",
      C: "Hiding every method",
      D: "Changing only a return type"
    },
    correctAnswer: "A",
    explanation: "Method overloading occurs when methods share the same name in a class but have different parameter lists.",
    hint: "Compile-time polymorphism with different arguments."
  },
  {
    id: 44,
    topic: "Inheritance and Polymorphism",
    question: "What is method overriding?",
    options: {
      A: "Defining a new method with a different name",
      B: "Providing a subclass implementation of an inherited instance method",
      C: "Defining multiple constructors",
      D: "Changing a variable value"
    },
    correctAnswer: "B",
    explanation: "Method overriding occurs when a subclass redefines an inherited instance method using the exact same signature.",
    hint: "Runtime polymorphism supplying a specialized implementation in a child class."
  },
  {
    id: 45,
    topic: "Inheritance and Polymorphism",
    question: "What is the output?\nclass A { void show() { System.out.println(\"A\"); } }\nclass B extends A { void show() { System.out.println(\"B\"); } }\nclass Main {\n  public static void main(String[] args) {\n    A obj = new B();\n    obj.show();\n  }\n}",
    options: {
      A: "A",
      B: "B",
      C: "AB",
      D: "Compilation error"
    },
    correctAnswer: "B",
    explanation: "Through dynamic method dispatch, the JVM resolves obj.show() according to the runtime object type (B), printing 'B'.",
    hint: "Method resolution depends on the actual instantiated object type."
  },
  {
    id: 46,
    topic: "Inheritance and Polymorphism",
    question: "Can a final class be extended?",
    options: {
      A: "Yes",
      B: "No",
      C: "Only by an abstract class",
      D: "Only in the same package"
    },
    correctAnswer: "B",
    explanation: "A class marked with the 'final' keyword cannot be inherited or subclassed by any class.",
    hint: "Final locks the class against further extension."
  },
  {
    id: 47,
    topic: "Inheritance and Polymorphism",
    question: "Can an abstract class be instantiated directly?",
    options: {
      A: "Yes",
      B: "No",
      C: "Only with static",
      D: "Only with final"
    },
    correctAnswer: "B",
    explanation: "Abstract classes are incomplete specifications and cannot be instantiated with 'new'; they must be extended.",
    hint: "An abstract class serves solely as a base for concrete subclasses."
  },
  {
    id: 48,
    topic: "Inheritance and Polymorphism",
    question: "Which keyword prevents a method from being overridden?",
    options: {
      A: "static",
      B: "final",
      C: "super",
      D: "extends"
    },
    correctAnswer: "B",
    explanation: "Declaring a method 'final' prevents subclasses from overriding it.",
    hint: "The same keyword used to prevent class inheritance."
  },
  {
    id: 49,
    topic: "Inheritance and Polymorphism",
    question: "What is dynamic method dispatch?",
    options: {
      A: "Choosing an overridden instance method at runtime based on the actual object",
      B: "Compiling all methods twice",
      C: "Calling only static methods",
      D: "Creating arrays dynamically"
    },
    correctAnswer: "A",
    explanation: "Dynamic method dispatch is the runtime resolution mechanism that binds an overridden method call to the actual object type.",
    hint: "Runtime resolution of polymorphic method calls."
  },
  {
    id: 50,
    topic: "Inheritance and Polymorphism",
    question: "What is the output?\nclass A { int x = 10; }\nclass B extends A { int x = 20; }\nclass Main {\n  public static void main(String[] args) {\n    A obj = new B();\n    System.out.println(obj.x);\n  }\n}",
    options: {
      A: "10",
      B: "20",
      C: "30",
      D: "Error"
    },
    correctAnswer: "A",
    explanation: "In Java, instance variables are not overridden polymorphically; field access is determined by the reference type (A).",
    hint: "Variable access is bound at compile time by reference type."
  },

  // Section 6 — Interfaces and Packages (Q51–60)
  {
    id: 51,
    topic: "Interfaces and Packages",
    question: "Which keyword declares an interface?",
    options: {
      A: "interface",
      B: "implements",
      C: "package",
      D: "abstract"
    },
    correctAnswer: "A",
    explanation: "The 'interface' keyword defines a Java interface specifying abstract methods and constants.",
    hint: "Identical to the name of the feature itself."
  },
  {
    id: 52,
    topic: "Interfaces and Packages",
    question: "Which keyword connects a class to an interface?",
    options: {
      A: "extends",
      B: "implements",
      C: "inherits",
      D: "interface"
    },
    correctAnswer: "B",
    explanation: "A class uses 'implements' to declare that it fulfills an interface specification.",
    hint: "The verb representing fulfilling an interface contract."
  },
  {
    id: 53,
    topic: "Interfaces and Packages",
    question: "Can a Java class implement multiple interfaces?",
    options: {
      A: "Yes",
      B: "No",
      C: "Only two",
      D: "Only if the class is abstract"
    },
    correctAnswer: "A",
    explanation: "Java permits a class to implement any number of comma-separated interfaces.",
    hint: "Java allows multiple inheritance of type via interfaces."
  },
  {
    id: 54,
    topic: "Interfaces and Packages",
    question: "What is a package?",
    options: {
      A: "A group of related classes and interfaces",
      B: "A primitive data type",
      C: "A loop",
      D: "An object constructor"
    },
    correctAnswer: "A",
    explanation: "A package is a naming mechanism that groups related classes, interfaces, and subpackages together.",
    hint: "Like a directory structure organizing related classes."
  },
  {
    id: 55,
    topic: "Interfaces and Packages",
    question: "Which statement declares a package?",
    options: {
      A: "import java.util;",
      B: "package mypack;",
      C: "class package;",
      D: "include mypack;"
    },
    correctAnswer: "B",
    explanation: "The 'package <name>;' declaration specifies the package namespace and must appear at the top of the file.",
    hint: "Starts with the 'package' keyword."
  },
  {
    id: 56,
    topic: "Interfaces and Packages",
    question: "Which package is automatically imported into every Java source file?",
    options: {
      A: "java.util",
      B: "java.io",
      C: "java.lang",
      D: "java.net"
    },
    correctAnswer: "C",
    explanation: "java.lang contains core classes (Object, String, Math, System, Thread) and is implicitly imported into every compilation unit.",
    hint: "Short for 'language' support."
  },
  {
    id: 57,
    topic: "Interfaces and Packages",
    question: "Which keyword imports a class or package?",
    options: {
      A: "include",
      B: "import",
      C: "using",
      D: "require"
    },
    correctAnswer: "B",
    explanation: "The 'import' keyword makes external classes and packages visible within the current source file.",
    hint: "Use 'import' rather than 'include' or 'using'."
  },
  {
    id: 58,
    topic: "Interfaces and Packages",
    question: "What is true about an abstract method?",
    options: {
      A: "It must always be private",
      B: "It has no method body in its declaration",
      C: "It must be static",
      D: "It must return int"
    },
    correctAnswer: "B",
    explanation: "Abstract methods declare their signature ending with a semicolon without providing an implementation body { }.",
    hint: "It has no curly braces or executable code."
  },
  {
    id: 59,
    topic: "Interfaces and Packages",
    question: "What is the default access level when no access modifier is specified for a top-level class member?",
    options: {
      A: "Public",
      B: "Private",
      C: "Package-private",
      D: "Protected"
    },
    correctAnswer: "C",
    explanation: "Omitting an access modifier grants package-private access (accessible anywhere within the same package).",
    hint: "Visible to other classes within the same package."
  },
  {
    id: 60,
    topic: "Interfaces and Packages",
    question: "Which statement about interface fields is correct?",
    options: {
      A: "They are instance variables",
      B: "They are implicitly public static final",
      C: "They must be private",
      D: "They cannot have values"
    },
    correctAnswer: "B",
    explanation: "All fields defined within an interface are implicitly public, static, and final constants.",
    hint: "They act as immutable constants."
  },

  // Section 7 — Exception Handling (Q61–70)
  {
    id: 61,
    topic: "Exception Handling",
    question: "What is an exception?",
    options: {
      A: "An event that disrupts normal program execution",
      B: "A package",
      C: "A variable declaration",
      D: "A constructor"
    },
    correctAnswer: "A",
    explanation: "An exception is an abnormal condition occurring during program execution that alters the normal flow of instructions.",
    hint: "An abnormal runtime condition that interrupts execution."
  },
  {
    id: 62,
    topic: "Exception Handling",
    question: "Which block contains code that may throw an exception?",
    options: {
      A: "catch",
      B: "try",
      C: "finally",
      D: "throws"
    },
    correctAnswer: "B",
    explanation: "The 'try' block encloses risky code statements that might throw an exception at runtime.",
    hint: "You 'try' executing suspect code."
  },
  {
    id: 63,
    topic: "Exception Handling",
    question: "Which block handles an exception?",
    options: {
      A: "try",
      B: "catch",
      C: "throw",
      D: "import"
    },
    correctAnswer: "B",
    explanation: "The 'catch' block handles and recovers from exceptions thrown in the preceding try block.",
    hint: "You 'catch' the exception thrown."
  },
  {
    id: 64,
    topic: "Exception Handling",
    question: "Which keyword explicitly throws an exception?",
    options: {
      A: "throws",
      B: "throw",
      C: "catch",
      D: "finally"
    },
    correctAnswer: "B",
    explanation: "'throw' (singular) is used within a method body to instantiate and trigger an exception.",
    hint: "The singular verb action."
  },
  {
    id: 65,
    topic: "Exception Handling",
    question: "Which keyword declares exceptions a method may pass to its caller?",
    options: {
      A: "throw",
      B: "throws",
      C: "try",
      D: "final"
    },
    correctAnswer: "B",
    explanation: "'throws' (plural) is appended to a method signature to declare potential checked exceptions.",
    hint: "The plural form placed in method signatures."
  },
  {
    id: 66,
    topic: "Exception Handling",
    question: "Which exception occurs when an integer is divided by zero?",
    options: {
      A: "IOException",
      B: "ArithmeticException",
      C: "NullPointerException",
      D: "ClassNotFoundException"
    },
    correctAnswer: "B",
    explanation: "Integer division by zero violates arithmetic rules, throwing ArithmeticException at runtime.",
    hint: "Relates to mathematical computation error."
  },
  {
    id: 67,
    topic: "Exception Handling",
    question: "Which of the following is a checked exception?",
    options: {
      A: "ArithmeticException",
      B: "NullPointerException",
      C: "IOException",
      D: "ArrayIndexOutOfBoundsException"
    },
    correctAnswer: "C",
    explanation: "IOException inherits directly from Exception (not RuntimeException), making it checked at compile-time.",
    hint: "Checked exceptions must be caught or declared; input/output errors fall into this category."
  },
  {
    id: 68,
    topic: "Exception Handling",
    question: "What is the output?\ntry {\n  System.out.print(\"A\");\n  int x = 10 / 0;\n} catch (ArithmeticException e) {\n  System.out.print(\"B\");\n}",
    options: {
      A: "A",
      B: "B",
      C: "AB",
      D: "Compilation error"
    },
    correctAnswer: "C",
    explanation: "'A' prints first, then 10/0 throws an ArithmeticException, transferring control to catch which prints 'B'.",
    hint: "Prints 'A' before the division error, then catch prints 'B'."
  },
  {
    id: 69,
    topic: "Exception Handling",
    question: "What is the usual purpose of finally?",
    options: {
      A: "Declare a class",
      B: "Perform cleanup after try/catch execution",
      C: "Create a thread",
      D: "Throw every exception"
    },
    correctAnswer: "B",
    explanation: "The finally block executes whether an exception occurs or not, making it ideal for resource cleanup.",
    hint: "Guaranteed execution for closing files, sockets, and connections."
  },
  {
    id: 70,
    topic: "Exception Handling",
    question: "Which is the parent class of most Java exception and error types?",
    options: {
      A: "Object",
      B: "Throwable",
      C: "Exception only",
      D: "RuntimeException"
    },
    correctAnswer: "B",
    explanation: "java.lang.Throwable is the superclass of both Exception and Error in Java.",
    hint: "The root class for everything that can be thrown."
  },

  // Section 8 — Multithreading (Q71–80)
  {
    id: 71,
    topic: "Multithreading",
    question: "What is a thread?",
    options: {
      A: "A lightweight unit of execution within a process",
      B: "A Java package",
      C: "A database",
      D: "A constructor"
    },
    correctAnswer: "A",
    explanation: "A thread is a lightweight sub-process representing a separate, concurrent path of execution.",
    hint: "The smallest independent unit of CPU scheduling inside a process."
  },
  {
    id: 72,
    topic: "Multithreading",
    question: "Which class can be extended to create a thread?",
    options: {
      A: "Runnable",
      B: "Thread",
      C: "System",
      D: "ObjectInputStream"
    },
    correctAnswer: "B",
    explanation: "A class can extend java.lang.Thread and override its run() method to define custom thread behavior.",
    hint: "The class name directly matches 'Thread'."
  },
  {
    id: 73,
    topic: "Multithreading",
    question: "Which interface can be implemented to define a thread task?",
    options: {
      A: "Runnable",
      B: "Serializable",
      C: "Comparable",
      D: "Cloneable"
    },
    correctAnswer: "A",
    explanation: "java.lang.Runnable defines a single run() method and is commonly implemented to specify thread tasks.",
    hint: "Describes something that is able to be run."
  },
  {
    id: 74,
    topic: "Multithreading",
    question: "Which method starts a new thread?",
    options: {
      A: "run()",
      B: "start()",
      C: "execute()",
      D: "begin()"
    },
    correctAnswer: "B",
    explanation: "The start() method allocates a new thread call stack and causes the JVM to execute run() asynchronously.",
    hint: "Calling run() does not create a thread; calling this method does."
  },
  {
    id: 75,
    topic: "Multithreading",
    question: "What happens when you call run() directly?",
    options: {
      A: "It always creates a new thread",
      B: "It executes as an ordinary method call on the current thread",
      C: "It terminates the JVM",
      D: "It creates a daemon thread"
    },
    correctAnswer: "B",
    explanation: "Calling run() directly bypasses thread creation and executes synchronously on the caller's thread.",
    hint: "It behaves like any regular standard method invocation."
  },
  {
    id: 76,
    topic: "Multithreading",
    question: "Which method pauses a thread for a specified time?",
    options: {
      A: "wait()",
      B: "sleep()",
      C: "stop()",
      D: "yieldAll()"
    },
    correctAnswer: "B",
    explanation: "Thread.sleep(long milliseconds) pauses current thread execution for the designated interval.",
    hint: "Puts the thread to sleep for milliseconds."
  },
  {
    id: 77,
    topic: "Multithreading",
    question: "What is synchronization used for?",
    options: {
      A: "Increasing array size",
      B: "Controlling concurrent access to shared resources",
      C: "Compiling Java code",
      D: "Creating packages"
    },
    correctAnswer: "B",
    explanation: "Synchronization prevents race conditions and data inconsistency by coordinating concurrent thread access.",
    hint: "Prevents multiple threads from accessing shared state simultaneously."
  },
  {
    id: 78,
    topic: "Multithreading",
    question: "Which keyword is used for a synchronized method or block?",
    options: {
      A: "volatile",
      B: "synchronized",
      C: "transient",
      D: "native"
    },
    correctAnswer: "B",
    explanation: "The 'synchronized' keyword establishes monitor lock acquisition around critical sections.",
    hint: "Identical to the name of the concurrency feature."
  },
  {
    id: 79,
    topic: "Multithreading",
    question: "Which method makes a thread wait for another thread to finish?",
    options: {
      A: "sleep()",
      B: "join()",
      C: "start()",
      D: "notify()"
    },
    correctAnswer: "B",
    explanation: "Calling thread.join() halts the calling thread until the targeted thread finishes execution.",
    hint: "Joins back to the waiting thread upon completion."
  },
  {
    id: 80,
    topic: "Multithreading",
    question: "What is deadlock?",
    options: {
      A: "A thread completing normally",
      B: "Threads waiting indefinitely for resources held by each other",
      C: "A syntax error",
      D: "An empty loop only"
    },
    correctAnswer: "B",
    explanation: "Deadlock occurs when two or more threads are permanently blocked, each holding resources the other requires.",
    hint: "A mutual waiting standstill with no progression."
  },

  // Section 9 — Input/Output and Strings (Q81–90)
  {
    id: 81,
    topic: "Input/Output and Strings",
    question: "Which class is commonly used to read keyboard input?",
    options: {
      A: "Scanner",
      B: "FileWriter",
      C: "PrintWriter only",
      D: "Socket"
    },
    correctAnswer: "A",
    explanation: "java.util.Scanner provides straightforward methods (nextInt, nextLine) to parse user console input from System.in.",
    hint: "Commonly initialized with System.in to read user keyboard inputs."
  },
  {
    id: 82,
    topic: "Input/Output and Strings",
    question: "Which package contains Scanner?",
    options: {
      A: "java.io",
      B: "java.util",
      C: "java.net",
      D: "java.sql"
    },
    correctAnswer: "B",
    explanation: "Scanner belongs to the utility package: java.util.Scanner.",
    hint: "Located in the utility package, not java.io."
  },
  {
    id: 83,
    topic: "Input/Output and Strings",
    question: "Which class is commonly used to read bytes from a file?",
    options: {
      A: "FileInputStream",
      B: "FileWriter",
      C: "BufferedWriter",
      D: "StringBuilder"
    },
    correctAnswer: "A",
    explanation: "FileInputStream is a raw byte stream class intended for reading streams of raw bytes from a file.",
    hint: "Input stream specifically for files."
  },
  {
    id: 84,
    topic: "Input/Output and Strings",
    question: "Which class is designed to write characters to a file?",
    options: {
      A: "FileReader",
      B: "FileWriter",
      C: "FileInputStream",
      D: "Scanner"
    },
    correctAnswer: "B",
    explanation: "FileWriter is a character stream class used for writing 16-bit text characters directly to files.",
    hint: "Character streams writing to files use 'Writer'."
  },
  {
    id: 85,
    topic: "Input/Output and Strings",
    question: "What is the main difference between byte and character streams?",
    options: {
      A: "Byte streams handle raw bytes; character streams handle text characters",
      B: "Both can only handle images",
      C: "Character streams cannot read files",
      D: "There is no difference"
    },
    correctAnswer: "A",
    explanation: "Byte streams read and write raw 8-bit bytes (binary), whereas character streams process 16-bit Unicode characters.",
    hint: "8-bit raw data vs 16-bit Unicode text characters."
  },
  {
    id: 86,
    topic: "Input/Output and Strings",
    question: "Are Java strings mutable?",
    options: {
      A: "Yes",
      B: "No, String objects are immutable",
      C: "Only inside loops",
      D: "Only when static"
    },
    correctAnswer: "B",
    explanation: "String objects in Java are immutable; once created, their character contents cannot be altered in memory.",
    hint: "Any string manipulation creates a brand new String object."
  },
  {
    id: 87,
    topic: "Input/Output and Strings",
    question: "Which class is designed for mutable strings and is not synchronized?",
    options: {
      A: "String",
      B: "StringBuilder",
      C: "Integer",
      D: "Character"
    },
    correctAnswer: "B",
    explanation: "StringBuilder provides mutable character sequences with fast, unsynchronized performance (unlike StringBuffer).",
    hint: "The modern, unsynchronized alternative to StringBuffer."
  },
  {
    id: 88,
    topic: "Input/Output and Strings",
    question: "What is the output?\nString s = \"Java\";\ns.concat(\" World\");\nSystem.out.println(s);",
    options: {
      A: "Java World",
      B: "Java",
      C: "World",
      D: "Compilation error"
    },
    correctAnswer: "B",
    explanation: "String is immutable. s.concat() produces a new String that was not reassigned to 's', so 's' remains \"Java\".",
    hint: "Strings are immutable; without reassignment, 's' does not change."
  },
  {
    id: 89,
    topic: "Input/Output and Strings",
    question: "What is the output?\nString a = new String(\"Java\");\nString b = new String(\"Java\");\nSystem.out.println(a.equals(b));",
    options: {
      A: "true",
      B: "false",
      C: "null",
      D: "Error"
    },
    correctAnswer: "A",
    explanation: "The equals() method compares string contents character by character, returning true since both hold \"Java\".",
    hint: "equals() compares character sequence value rather than memory address."
  },
  {
    id: 90,
    topic: "Input/Output and Strings",
    question: "Which method compares two strings for content equality?",
    options: {
      A: "==",
      B: "equals()",
      C: "compareReference()",
      D: "same()"
    },
    correctAnswer: "B",
    explanation: "The equals() method compares content equivalence, whereas == compares memory reference identity.",
    hint: "The standard method for value comparison in Java objects."
  },

  // Section 10 — Applets, Servlets, AWT and Swing (Q91–100)
  {
    id: 91,
    topic: "Applets, Servlets, AWT and Swing",
    question: "What is AWT?",
    options: {
      A: "Abstract Window Toolkit",
      B: "Advanced Web Technology",
      C: "Application Writing Tool",
      D: "Automated Window Testing"
    },
    correctAnswer: "A",
    explanation: "AWT stands for Abstract Window Toolkit, Java's first GUI library using platform-native widgets.",
    hint: "Abstract Window ..."
  },
  {
    id: 92,
    topic: "Applets, Servlets, AWT and Swing",
    question: "Which package contains AWT components?",
    options: {
      A: "java.awt",
      B: "java.sql",
      C: "java.net",
      D: "java.util"
    },
    correctAnswer: "A",
    explanation: "The core AWT components (Button, Frame, Panel) reside in the java.awt package.",
    hint: "Directly named java.awt."
  },
  {
    id: 93,
    topic: "Applets, Servlets, AWT and Swing",
    question: "Which package contains Swing components?",
    options: {
      A: "java.swing",
      B: "javax.swing",
      C: "java.awt.swing",
      D: "java.gui"
    },
    correctAnswer: "B",
    explanation: "Swing components are part of Java's standard extension library, packaged under javax.swing.",
    hint: "Notice the 'x' in the package namespace denoting standard extensions."
  },
  {
    id: 94,
    topic: "Applets, Servlets, AWT and Swing",
    question: "Which Swing component represents a button?",
    options: {
      A: "JLabel",
      B: "JButton",
      C: "JFrame",
      D: "JTextField"
    },
    correctAnswer: "B",
    explanation: "JButton is the standard Swing push button component.",
    hint: "Swing widgets typically prefix standard component names with 'J'."
  },
  {
    id: 95,
    topic: "Applets, Servlets, AWT and Swing",
    question: "Which Swing component is commonly used for a single-line text input?",
    options: {
      A: "JTextField",
      B: "JLabel",
      C: "JPanel",
      D: "JButton"
    },
    correctAnswer: "A",
    explanation: "JTextField allows the user to input and edit a single line of plain text.",
    hint: "A 'Field' for typing 'Text' prefixed with J."
  },
  {
    id: 96,
    topic: "Applets, Servlets, AWT and Swing",
    question: "Which listener commonly handles button click actions?",
    options: {
      A: "MouseMotionListener",
      B: "ActionListener",
      C: "WindowListener only",
      D: "KeyAdapter only"
    },
    correctAnswer: "B",
    explanation: "ActionListener defines actionPerformed(ActionEvent e), triggered whenever a button is clicked.",
    hint: "Listens for user interface actions like clicks."
  },
  {
    id: 97,
    topic: "Applets, Servlets, AWT and Swing",
    question: "What is the main difference between AWT and Swing?",
    options: {
      A: "Swing components are generally lightweight and provide a richer component set",
      B: "AWT is a database",
      C: "Swing only works in command-line applications",
      D: "AWT supports no GUI components"
    },
    correctAnswer: "A",
    explanation: "AWT components are heavyweight (platform-dependent), while Swing is written entirely in Java, rendering lightweight components.",
    hint: "Swing components are 100% pure Java and lightweight."
  },
  {
    id: 98,
    topic: "Applets, Servlets, AWT and Swing",
    question: "What is a layout manager used for?",
    options: {
      A: "Managing component placement and sizing in containers",
      B: "Compiling Java files",
      C: "Connecting to databases",
      D: "Starting threads"
    },
    correctAnswer: "A",
    explanation: "Layout managers automatically calculate the position and geometric bounds of components in a container.",
    hint: "Arranges and manages visual layout of widgets."
  },
  {
    id: 99,
    topic: "Applets, Servlets, AWT and Swing",
    question: "What is a servlet mainly used for?",
    options: {
      A: "Server-side request and response handling",
      B: "Drawing only desktop buttons",
      C: "Compiling Java bytecode",
      D: "Replacing the JVM"
    },
    correctAnswer: "A",
    explanation: "Servlets execute on web servers to process client requests (GET/POST) and generate dynamic web content.",
    hint: "Server-side web application component."
  },
  {
    id: 100,
    topic: "Applets, Servlets, AWT and Swing",
    question: "Which statement about Java applets is correct?",
    options: {
      A: "They are the modern standard for web applications",
      B: "They are a legacy technology and are not supported by modern mainstream browsers",
      C: "They are JDBC drivers",
      D: "They are required for Swing applications"
    },
    correctAnswer: "B",
    explanation: "Applets are deprecated and removed from modern web browsers due to obsolete NPAPI plugin architecture.",
    hint: "An outdated technology obsolete in current browsers."
  },

  // Section 11 — Networking and JDBC (Q101–110)
  {
    id: 101,
    topic: "Networking and JDBC",
    question: "Which package provides Java networking classes?",
    options: {
      A: "java.net",
      B: "java.sql",
      C: "java.awt",
      D: "java.lang"
    },
    correctAnswer: "A",
    explanation: "java.net supplies networking classes including Socket, ServerSocket, URL, and InetAddress.",
    hint: "Short for networking: java.net."
  },
  {
    id: 102,
    topic: "Networking and JDBC",
    question: "Which class represents a client-side TCP connection endpoint?",
    options: {
      A: "ServerSocket",
      B: "Socket",
      C: "File",
      D: "DriverManager"
    },
    correctAnswer: "B",
    explanation: "java.net.Socket represents the client side of a two-way TCP communication channel.",
    hint: "The fundamental endpoint for establishing network connections."
  },
  {
    id: 103,
    topic: "Networking and JDBC",
    question: "Which class listens for incoming TCP connections on a server?",
    options: {
      A: "Socket",
      B: "ServerSocket",
      C: "Scanner",
      D: "Connection"
    },
    correctAnswer: "B",
    explanation: "java.net.ServerSocket binds to a port and awaits incoming client requests via its accept() method.",
    hint: "The server-side counterpart to Socket."
  },
  {
    id: 104,
    topic: "Networking and JDBC",
    question: "What does JDBC stand for?",
    options: {
      A: "Java Database Connectivity",
      B: "Java Data Compiler",
      C: "Java Desktop Connection",
      D: "Java Direct Code"
    },
    correctAnswer: "A",
    explanation: "JDBC stands for Java Database Connectivity, the standard API connecting Java applications to relational databases.",
    hint: "Standard API for database communication in Java."
  },
  {
    id: 105,
    topic: "Networking and JDBC",
    question: "Which package contains core JDBC interfaces?",
    options: {
      A: "java.sql",
      B: "java.net",
      C: "java.awt",
      D: "java.text"
    },
    correctAnswer: "A",
    explanation: "The core JDBC interfaces (Connection, Statement, ResultSet) reside in java.sql.",
    hint: "Named after the standard database query language: SQL."
  },
  {
    id: 106,
    topic: "Networking and JDBC",
    question: "Which JDBC method obtains a database connection?",
    options: {
      A: "DriverManager.getConnection()",
      B: "System.connect()",
      C: "Socket.getDatabase()",
      D: "Connection.create()"
    },
    correctAnswer: "A",
    explanation: "DriverManager.getConnection(url, user, password) attempts to establish a database connection with the specified JDBC URL.",
    hint: "Static factory method on DriverManager."
  },
  {
    id: 107,
    topic: "Networking and JDBC",
    question: "Which interface represents a connection to a database?",
    options: {
      A: "Statement",
      B: "Connection",
      C: "ResultSet",
      D: "Driver"
    },
    correctAnswer: "B",
    explanation: "java.sql.Connection represents an established session with a specific relational database.",
    hint: "The interface name literally describes a database connection."
  },
  {
    id: 108,
    topic: "Networking and JDBC",
    question: "Which JDBC interface is suitable for parameterized SQL queries?",
    options: {
      A: "PreparedStatement",
      B: "ResultSet",
      C: "DriverManager",
      D: "DatabaseMetaData"
    },
    correctAnswer: "A",
    explanation: "PreparedStatement precompiles SQL statements and allows parameterized input using '?' placeholders, preventing SQL injection.",
    hint: "A statement that is pre-compiled for parameters."
  },
  {
    id: 109,
    topic: "Networking and JDBC",
    question: "Which JDBC method is commonly used for a SELECT query?",
    options: {
      A: "executeQuery()",
      B: "executeUpdate()",
      C: "commitOnly()",
      D: "getConnection()"
    },
    correctAnswer: "A",
    explanation: "executeQuery() executes SQL queries (like SELECT) and returns the data inside a ResultSet.",
    hint: "Used for queries that retrieve data rather than modifying rows."
  },
  {
    id: 110,
    topic: "Networking and JDBC",
    question: "Which JDBC object stores rows returned by a query?",
    options: {
      A: "Statement",
      B: "ResultSet",
      C: "DriverManager",
      D: "SQLException"
    },
    correctAnswer: "B",
    explanation: "A ResultSet maintains a cursor pointing to rows returned from a database query.",
    hint: "A tabular 'set' of query 'results'."
  },

  // Section 12 — Mixed Output-Based and Tricky Questions (Q111–120)
  {
    id: 111,
    topic: "Mixed Output-Based Questions",
    question: "What is the output?\nint x = 10;\nSystem.out.println(x > 5 && x < 20);",
    options: {
      A: "true",
      B: "false",
      C: "10",
      D: "Compilation error"
    },
    correctAnswer: "A",
    explanation: "10 > 5 is true, and 10 < 20 is true. true && true evaluates to true.",
    hint: "Both relational expressions evaluate to true."
  },
  {
    id: 112,
    topic: "Mixed Output-Based Questions",
    question: "What is the output?\nSystem.out.println(5 + 2 + \"Java\");",
    options: {
      A: "52Java",
      B: "7Java",
      C: "Java7",
      D: "Compilation error"
    },
    correctAnswer: "B",
    explanation: "Evaluation goes left-to-right: 5 + 2 is arithmetic addition (7), then 7 + \"Java\" evaluates to \"7Java\".",
    hint: "Numeric addition occurs first before encountering the string."
  },
  {
    id: 113,
    topic: "Mixed Output-Based Questions",
    question: "What is the output?\nSystem.out.println(\"Java\" + 5 + 2);",
    options: {
      A: "Java7",
      B: "Java52",
      C: "7Java",
      D: "Error"
    },
    correctAnswer: "B",
    explanation: "Left-to-right: \"Java\" + 5 evaluates to \"Java5\", then \"Java5\" + 2 evaluates to \"Java52\".",
    hint: "String concatenation begins immediately, converting following numbers into text."
  },
  {
    id: 114,
    topic: "Mixed Output-Based Questions",
    question: "What is the output?\nint x = 3;\nif (x == 3) System.out.print(\"A\");\nelse System.out.print(\"B\");",
    options: {
      A: "A",
      B: "B",
      C: "AB",
      D: "Error"
    },
    correctAnswer: "A",
    explanation: "The condition (x == 3) is true, so only the 'if' branch runs and prints 'A'.",
    hint: "The condition evaluates to true."
  },
  {
    id: 115,
    topic: "Mixed Output-Based Questions",
    question: "What is the output?\nfor (int i = 1; i <= 3; i++) {\n  System.out.print(i);\n}",
    options: {
      A: "123",
      B: "012",
      C: "1234",
      D: "321"
    },
    correctAnswer: "A",
    explanation: "The loop runs for i = 1, 2, and 3, printing each value consecutively on the same line: 123.",
    hint: "Values from 1 through 3 printed side-by-side."
  },
  {
    id: 116,
    topic: "Mixed Output-Based Questions",
    question: "What is the output?\nint[] a = {2, 4, 6};\nSystem.out.println(a[1]);",
    options: {
      A: "2",
      B: "4",
      C: "6",
      D: "Error"
    },
    correctAnswer: "B",
    explanation: "Arrays are 0-indexed: a[0] = 2, a[1] = 4, and a[2] = 6.",
    hint: "Index 1 references the second item in the array."
  },
  {
    id: 117,
    topic: "Mixed Output-Based Questions",
    question: "What is the output?\nclass Test {\n  public static void main(String[] args) {\n    System.out.println(\"Hello\".length());\n  }\n}",
    options: {
      A: "4",
      B: "5",
      C: "6",
      D: "Error"
    },
    correctAnswer: "B",
    explanation: "The string \"Hello\" consists of 5 characters ('H', 'e', 'l', 'l', 'o').",
    hint: "Count each letter in the word 'Hello'."
  },
  {
    id: 118,
    topic: "Mixed Output-Based Questions",
    question: "What is the output?\ntry {\n  System.out.print(\"A\");\n} finally {\n  System.out.print(\"B\");\n}",
    options: {
      A: "A",
      B: "B",
      C: "AB",
      D: "No output"
    },
    correctAnswer: "C",
    explanation: "The try block prints 'A', and the finally block always executes afterward, printing 'B'. Combined output is 'AB'.",
    hint: "The try body runs, and the finally block is guaranteed to run after it."
  },
  {
    id: 119,
    topic: "Mixed Output-Based Questions",
    question: "Which statement about garbage collection is correct?",
    options: {
      A: "It automatically reclaims memory from objects that are no longer reachable, subject to JVM execution",
      B: "It immediately deletes every unused variable",
      C: "It runs at a guaranteed exact time",
      D: "It is used only for database records"
    },
    correctAnswer: "A",
    explanation: "Garbage collection automatically reclaims heap memory allocated to unreferenced, unreachable objects when the JVM determines.",
    hint: "Frees unreferenced memory automatically without a deterministic guarantee of the exact instant."
  },
  {
    id: 120,
    topic: "Mixed Output-Based Questions",
    question: "Which statement about == and equals() is correct for ordinary Java objects?",
    options: {
      A: "Both always compare object contents",
      B: "== compares references for object operands; equals() can compare logical content if overridden",
      C: "equals() always compares memory addresses",
      D: "They are identical in every case"
    },
    correctAnswer: "B",
    explanation: "== checks if two references point to the exact same memory address, whereas equals() can be overridden for logical value equality.",
    hint: "== evaluates reference addresses; equals() is designed to compare logical contents."
  }
];
