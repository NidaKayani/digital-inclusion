import { NextRequest, NextResponse } from 'next/server';

interface LessonRequest {
  subject: string;
  level: string;
  topic: string;
  description: string;
  duration: number;
}

interface LessonConcept {
  title: string;
  explanation: string;
  example: string;
}

interface InteractiveExercise {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface PracticeProblem {
  problem: string;
  solution: string;
  hint: string;
}

interface LessonContent {
  introduction: string;
  concepts: LessonConcept[];
  interactiveExercise: InteractiveExercise;
  practiceProblems: PracticeProblem[];
  summary: string;
  nextSteps: string[];
}

export async function POST(request: NextRequest) {
  try {
    const body: LessonRequest = await request.json();
    const { subject, level, topic, description, duration } = body;

    if (!subject || !level || !topic) {
      return NextResponse.json(
        { error: 'Subject, level, and topic are required' },
        { status: 400 }
      );
    }

    // Generate AI-powered lesson content
    const lessonContent = await generateAILessonContent(subject, level, topic, description, duration);
    
    return NextResponse.json(lessonContent);
  } catch (error) {
    console.error('Lesson generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate lesson content' },
      { status: 500 }
    );
  }
}

async function generateAILessonContent(
  subject: string,
  level: string,
  topic: string,
  _description: string,
  _duration: number
): Promise<LessonContent> {
  // For now, we'll generate structured lesson content based on predefined templates
  // In a real implementation, this would call an AI service like OpenAI, Claude, etc.
  
  const lessonTemplates = getLessonTemplates();
  const template = lessonTemplates[topic] || getDefaultTemplate(subject, level, topic);
  
  return template;
}

function getLessonTemplates(): Record<string, LessonContent> {
  return {
    "Variables and Data Types": {
      introduction: "Variables are containers that store data values. In programming, variables allow us to store and manipulate different types of data. Understanding data types is fundamental to writing effective code.",
      concepts: [
        {
          title: "What are Variables?",
          explanation: "A variable is a named location in memory that stores a value. Think of it like a labeled box where you can put different things.",
          example: "name = 'Alice'\nage = 25\nis_student = True"
        },
        {
          title: "Data Types",
          explanation: "Data types define what kind of data a variable can hold. Common types include strings (text), integers (whole numbers), floats (decimal numbers), and booleans (True/False).",
          example: "text = 'Hello World'  # String\nnumber = 42  # Integer\ndecimal = 3.14  # Float\nflag = True  # Boolean"
        },
        {
          title: "Variable Naming",
          explanation: "Variable names should be descriptive and follow naming conventions. Use lowercase letters and underscores for multi-word names.",
          example: "user_name = 'john_doe'\nuser_age = 25\nis_logged_in = True"
        }
      ],
      interactiveExercise: {
        question: "Which of the following is the correct way to create a variable in Python?",
        options: [
          "var name = 'John'",
          "name = 'John'",
          "string name = 'John'",
          "name := 'John'"
        ],
        correctAnswer: 1,
        explanation: "In Python, you simply use the variable name followed by an equals sign and the value. No special keywords like 'var' or type declarations are needed."
      },
      practiceProblems: [
        {
          problem: "Create a variable called 'city' and assign it the value 'New York'",
          solution: "city = 'New York'",
          hint: "Use quotes around the text value since it's a string"
        },
        {
          problem: "Create a variable called 'population' and assign it the value 8.4 million",
          solution: "population = 8400000",
          hint: "Numbers don't need quotes, and you can write 8.4 million as 8400000"
        },
        {
          problem: "Create a boolean variable called 'is_capital' and set it to True",
          solution: "is_capital = True",
          hint: "Boolean values in Python are True and False (capitalized)"
        }
      ],
      summary: "Variables are essential building blocks in programming. They allow us to store and reference data throughout our programs. Understanding different data types helps us choose the right type for our data and write more efficient code.",
      nextSteps: [
        "Practice creating variables with different data types",
        "Try using variables in simple calculations",
        "Experiment with string concatenation",
        "Learn about type conversion"
      ]
    },
    "Control Structures": {
      introduction: "Control structures allow your program to make decisions and repeat actions. They are the foundation of creating dynamic and interactive programs that can respond to different conditions.",
      concepts: [
        {
          title: "If Statements",
          explanation: "If statements allow your program to make decisions based on conditions. The code inside an if block only runs when the condition is true.",
          example: "age = 18\nif age >= 18:\n    print('You are an adult')\nelse:\n    print('You are a minor')"
        },
        {
          title: "For Loops",
          explanation: "For loops allow you to repeat code multiple times. They're commonly used to iterate over sequences like lists or strings.",
          example: "for i in range(5):\n    print(f'Count: {i}')\n\n# Output: Count: 0, Count: 1, Count: 2, Count: 3, Count: 4"
        },
        {
          title: "While Loops",
          explanation: "While loops continue executing as long as a condition is true. They're useful when you don't know how many times you need to repeat something.",
          example: "count = 0\nwhile count < 3:\n    print(f'Count: {count}')\n    count += 1"
        }
      ],
      interactiveExercise: {
        question: "What will be the output of this code?\nfor i in range(3):\n    print(i)",
        options: [
          "0, 1, 2",
          "1, 2, 3",
          "0, 1, 2, 3",
          "1, 2"
        ],
        correctAnswer: 0,
        explanation: "range(3) generates numbers from 0 to 2 (3 numbers total), so the output will be 0, 1, 2."
      },
      practiceProblems: [
        {
          problem: "Write an if statement that prints 'Even' if a number is even, 'Odd' if it's odd",
          solution: "if number % 2 == 0:\n    print('Even')\nelse:\n    print('Odd')",
          hint: "Use the modulo operator (%) to check if a number is divisible by 2"
        },
        {
          problem: "Write a loop that prints numbers 1 to 10",
          solution: "for i in range(1, 11):\n    print(i)",
          hint: "range(1, 11) gives you numbers from 1 to 10"
        },
        {
          problem: "Write a while loop that counts down from 5 to 1",
          solution: "count = 5\nwhile count > 0:\n    print(count)\n    count -= 1",
          hint: "Start with count = 5 and decrement it each iteration"
        }
      ],
      summary: "Control structures give your programs the ability to make decisions and repeat actions. Mastering if statements and loops is crucial for writing dynamic programs that can handle different scenarios and process data efficiently.",
      nextSteps: [
        "Practice writing if-else statements with multiple conditions",
        "Try nested loops",
        "Experiment with break and continue statements",
        "Learn about list comprehensions"
      ]
    },
    "Functions": {
      introduction: "Functions are reusable blocks of code that perform specific tasks. They help organize code, reduce repetition, and make programs easier to understand and maintain.",
      concepts: [
        {
          title: "Defining Functions",
          explanation: "Functions are defined using the 'def' keyword followed by the function name and parameters in parentheses.",
          example: "def greet(name):\n    return f'Hello, {name}!'\n\nmessage = greet('Alice')\nprint(message)  # Output: Hello, Alice!"
        },
        {
          title: "Function Parameters",
          explanation: "Parameters are variables that receive values when the function is called. You can have multiple parameters separated by commas.",
          example: "def add_numbers(a, b):\n    return a + b\n\nresult = add_numbers(5, 3)\nprint(result)  # Output: 8"
        },
        {
          title: "Return Values",
          explanation: "Functions can return values using the 'return' statement. If no return statement is used, the function returns None.",
          example: "def calculate_area(length, width):\n    area = length * width\n    return area\n\nroom_area = calculate_area(10, 12)\nprint(f'Room area: {room_area} square feet')"
        }
      ],
      interactiveExercise: {
        question: "What will this function return when called with calculate_square(4)?",
        options: [
          "16",
          "8",
          "4",
          "Error"
        ],
        correctAnswer: 0,
        explanation: "The function multiplies the input by itself (4 * 4 = 16), so it returns 16."
      },
      practiceProblems: [
        {
          problem: "Write a function called 'is_even' that takes a number and returns True if it's even, False otherwise",
          solution: "def is_even(number):\n    return number % 2 == 0",
          hint: "Use the modulo operator (%) to check if the number is divisible by 2"
        },
        {
          problem: "Write a function called 'get_max' that takes two numbers and returns the larger one",
          solution: "def get_max(a, b):\n    if a > b:\n        return a\n    else:\n        return b",
          hint: "Use an if statement to compare the two numbers"
        },
        {
          problem: "Write a function called 'repeat_string' that takes a string and a number, and returns the string repeated that many times",
          solution: "def repeat_string(text, times):\n    return text * times",
          hint: "You can multiply a string by a number in Python"
        }
      ],
      summary: "Functions are powerful tools for organizing code and making it reusable. They help break down complex problems into smaller, manageable pieces and make your code more readable and maintainable.",
      nextSteps: [
        "Learn about default parameters",
        "Explore variable scope",
        "Practice with lambda functions",
        "Learn about function decorators"
      ]
    }
  };
}

function getDefaultTemplate(subject: string, level: string, topic: string): LessonContent {
  return {
    introduction: `Welcome to today's lesson on ${topic}. This lesson is designed for ${level} level learners studying ${subject}. We'll explore the key concepts and provide hands-on practice to help you master this topic.`,
    concepts: [
      {
        title: "Introduction to the Topic",
        explanation: `This lesson covers the fundamentals of ${topic} at a ${level} level. Understanding this concept is essential for your ${subject} learning journey.`,
        example: "Example code and demonstrations will be provided throughout the lesson to illustrate key concepts."
      },
      {
        title: "Key Principles",
        explanation: `The main principles of ${topic} include understanding the core concepts, applying them in practice, and recognizing common patterns.`,
        example: "We'll work through practical examples that demonstrate these principles in action."
      }
    ],
    interactiveExercise: {
      question: "What is the main concept we're learning today?",
      options: [
        "Advanced programming techniques",
        topic,
        "Basic syntax",
        "Data structures"
      ],
      correctAnswer: 1,
      explanation: `Today we're focusing specifically on ${topic}, which is an important concept in ${subject} programming.`
    },
    practiceProblems: [
      {
        problem: "Practice implementing the concepts learned today",
        solution: "Try to apply what you've learned in a simple project or exercise",
        hint: "Start with basic examples and gradually increase complexity"
      },
      {
        problem: "Create a simple example that demonstrates the main concept",
        solution: "Write code that shows how the concept works in practice",
        hint: "Focus on clarity and simplicity in your implementation"
      }
    ],
    summary: `Today's lesson on ${topic} provides a solid foundation for ${level} level learners. You've learned the key concepts and had hands-on practice with examples and exercises.`,
    nextSteps: [
      "Practice the concepts learned in this lesson",
      "Try the exercises and experiment with variations",
      "Review the material and ensure you understand the key points",
      "Move to the next lesson when you feel confident with this topic"
    ]
  };
}
