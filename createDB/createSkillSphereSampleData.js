const { title } = require("process")

db = db.getSiblingDB('SkillSphereDB')

// Sample data for Users collection
if (!db.getCollectionNames().includes("users")) {
  db.createCollection('users')
}
usersCollection = db.getCollection("users")
usersCollection.remove({})
usersCollection.insert(
  {
    userID: 1,
    username: "JohnDoe",
    password: "strongpassword",
    role: "instructor"
  }
)
usersCollection.insert(
  {
    userID: 2,
    username: "JaneSmith",
    password: "secretpass",
    role: "instructor"
  }
)
usersCollection.insert(
  {
    userID: 3,
    username: "BarryAllen",
    password: "secretpass",
    role: "instructor"
  }
)
usersCollection.insert(
  {
    userID: 4,
    username: "DaveJoe",
    password: "password",
    role: "instructor"
  }
)
usersCollection.insert(
  {
    userID: 5,
    username: "AlexJ",
    password: "password1234",
    role: "instructor"
  }
)
usersCollection.insert(
  {
    userID: 6,
    username: "LexWindsor",
    password: "secretpass",
    role: "instructor"
  }
)
usersCollection.insert(
  {
    userID: 7,
    username: "AdminUser",
    password: "adminpass",
    role: "admin"
  }
)
usersCollection.insert(
  {
    userID: 8,
    username: "RayaLewis",
    password: "secretpass",
    role: "student"
  }
)
usersCollection.insert(
  {
    userID: 9,
    username: "BlakeLively",
    password: "secretpass",
    role: "student"
  }
)
usersCollection.insert(
  {
    userID: 10,
    username: "RavynYew",
    password: "secretpass",
    role: "student"
  }
)


// Sample data for Categories collection
if (!db.getCollectionNames().includes("categories")) {
  db.createCollection('categories');
} categoriesCollection = db.getCollection("categories")
categoriesCollection.remove({})
categoriesCollection.insert([
  {
    categoryID: "1",
    name: "Programming",
    description: "Courses related to programming languages and development."
  },
  {
    categoryID: "2",
    name: "Design",
    description: "Courses related to graphic design and creative arts."
  },
  {
    categoryID: "3",
    name: "Sports",
    description: "Courses related to sports and physical activities."
  },
  {
    categoryID: "4",
    name: "Instruments/Music",
    description: "Courses related to musical instruments and music theory."
  },
  {
    categoryID: "5",
    name: "Dance",
    description: "Courses related to Dance styles."
  },
  {
    categoryID: "6",
    name: "Finance",
    description: "Courses related to finance."
  },
  {
    categoryID: "7",
    name: "Law",
    description: "Courses related to Law"
  }
])

// Sample data for Courses collection
if (!db.getCollectionNames().includes("courses")) {
  db.createCollection('courses');
}
coursesCollection = db.getCollection("courses")
coursesCollection.remove({})
coursesCollection.insert([
  {
    courseID: "1",
    courseName: "introduction_to_python_programming",
    title: "Introduction to Python Programming",
    description: "Learn Python basics and programming concepts.",
    categoryID: "1",
    instructorID: "1",
    userID: "31",
    price: 99.99,
    courseImage: "https://i.ytimg.com/vi/9QE045JWL_I/maxresdefault.jpg",
    schedule: [
      {
        date: "2024-05-10",
        startTime: "10:00 AM",
        endTime: "12:00 PM",
        location: "Online"
      },
      {
        date: "2024-05-15",
        startTime: "2:00 PM",
        endTime: "4:00 PM",
        location: "Online"
      }
    ]
  },
  {
    courseID: "2",
    courseName: "graphic_design_fundamentals",
    title: "Graphic Design Fundamentals",
    description: "Explore the basics of graphic design and visual communication.",
    categoryID: "2",
    instructorID: "3",
    userID: "21",
    price: 149.99,
    courseImage: "https://planningtank.com/wp-content/uploads/2020/01/Basics-of-Graphic-Design.jpg",
    schedule: [
      {
        date: "2024-05-12",
        startTime: "9:00 AM",
        endTime: "11:00 AM",
        location: "Online"
      },
      {
        date: "2024-05-17",
        startTime: "1:00 PM",
        endTime: "3:00 PM",
        location: "Online"
      }
    ]
  },
  {
    courseID: "3",
    courseName: "basketball",
    title: "Basketball",
    description: "Master the basketball including dribbling, shooting, and defense.",
    categoryID: "3",
    instructorID: "4",
    userID: "12",
    price: 129.99,
    courseImage: "https://ryancheffernan.org/wp-content/uploads/ryancheffernan-org/sites/1509/basketball-dunk.jpg",
    schedule: [
      {
        date: "2024-06-05",
        startTime: "4:00 PM",
        endTime: "6:00 PM",
        location: "Watts Basketball"
      },
      {
        date: "2024-06-10",
        startTime: "6:00 PM",
        endTime: "8:00 PM",
        location: "Watts Basketball"
      }
    ]
  },
  {
    courseID: "4",
    courseName: "guitar_basics",
    title: "Guitar Basics",
    description: "Learn the basics of playing the guitar, including chords and strumming patterns.",
    categoryID: "4",
    instructorID: "6",
    userID: "10",
    price: 79.99,
    courseImage: "https://hiddenmt.com/images/img_PD3RRnhSnxde9KaUnf5xn7/header-image.jpg?fit=outside&w=1600&h=300",
    schedule: [
      {
        date: "2024-06-08",
        startTime: "3:00 PM",
        endTime: "5:00 PM",
        location: "The Music Factory"
      },
      {
        date: "2024-06-15",
        startTime: "5:00 PM",
        endTime: "7:00 PM",
        location: "The Music Factory"
      }
    ]
  },
  {
    courseID: "5",
    courseName: "introduction_to_finance",
    title: "Introduction to Finance",
    description: "Explore the basics of finance.",
    categoryID: "6",
    instructorID: "2",
    userID: "11",
    price: 49.99,
    courseImage: "https://image3.slideserve.com/5849620/introduction-to-finance-l.jpg",
    schedule: [
      {
        date: "2024-09-03",
        startTime: "9:00 AM",
        endTime: "11:05 AM",
        location: "Seattle Univeristy"
      },
      {
        date: "2024-09-25",
        startTime: "1:00 PM",
        endTime: "3:00 PM",
        location: "Seattle University"
      }
    ]
  },
  {
    courseID: "6",
    courseName: "introduction_to_criminal_law",
    title: "Introduction to Criminal Law",
    description: "Explore the basics of criminal law.",
    categoryID: "7",
    instructorID: "5",
    userID: "1",
    price: 119.99,
    courseImage: "https://th.bing.com/th/id/OIP.ojx1ueXG8CnjKlHIw4TicQAAAA?rs=1&pid=ImgDetMain",
    schedule: [
      {
        date: "2024-03-02",
        startTime: "6:00 PM",
        endTime: "8:00 PM",
        location: "Seattle Univeristy"
      },
      {
        date: "2024-05-17",
        startTime: "3:00 PM",
        endTime: "5:00 PM",
        location: "Seattle Univeristy"
      }
    ]
  },
])

/// Sample data for InstructorOrOrganizer collection
if (!db.getCollectionNames().includes("instructors")) {
  db.createCollection('instructors');
}
instructorsCollection = db.getCollection("instructors")
instructorsCollection.remove({})
instructorsCollection.insert([
  {
    instructorID: "1",
    userID: "2",
    name: "Jane Smith",
    email: "janesmith@example.com",
    phoneNo: 1234567890,
    expertise: "Python Programming",
    experience: 5,
    bio: "Experienced Python developer and instructor. Skilled in backend development and data analysis.",
    rating: 4.5,
    profileImage: "https://technonguide.com/wp-content/uploads/2021/01/Python-Programming.jpg",
    registrationDate: "2023-01-15"
  },
  {
    instructorID: "2",
    userID: '1',
    name: "Ericka J",
    email: "erickajj@example.com",
    phoneNo: 9876543210,
    expertise: "Finance",
    experience: 3,
    bio: "Experienced financial expert with a deep understanding of investment strategies, budgeting, and financial planning.",
    rating: 4.2,
    profileImage: "https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img/https://jamesrosseausr.com/wp-content/uploads/bb-plugin/cache/TinoChitiga-circle.jpeg",
    registrationDate: "2023-02-20"
  },
  {
    instructorID: '3',
    userID: '5',
    name: "Alex Jordan",
    email: "alex@example.com",
    phoneNo: 9876543210,
    expertise: "Graphic Design",
    experience: 3,
    bio: "Passionate about design and teaching. Specializes in UI/UX design and branding.",
    rating: 4.2,
    profileImage: "https://www.journal-advocate.com/wp-content/uploads/migration/2015/0928/20150928_29ST_Graphic_Design_Teacher-1.jpg?w=1024&h=670",
    registrationDate: "2023-02-20"
  },
  {
    instructorID: "4",
    userID: "6",
    name: "Lexington Windsor",
    email: "rex@example.com",
    phoneNo: 9876543210,
    expertise: "Basket Ball",
    experience: 3,
    bio: "Experienced basketball coach with a focus on fundamental skills and game strategies.",
    rating: 4.2,
    profileImage: "https://img.freepik.com/free-photo/portrait-sports-teacher-basketball-court_107420-52322.jpg?size=626&ext=jpg",
    registrationDate: "2023-02-20"
  },
  {
    instructorID: "5",
    userID: "4",
    name: "Smitha Jain",
    email: "smithaj@example.com",
    phoneNo: 2063468791,
    expertise: "Criminal Law",
    experience: 5,
    bio: "Well informed on criminal law.",
    rating: 4.0,
    profileImage: "https://th.bing.com/th/id/OIP.I8Zh8u8Sv5NujzmYrGKyzQAAAA?rs=1&pid=ImgDetMain",
    registrationDate: "2024-02-06"
  },
  {
    instructorID: "9",
    userID: "8",
    name: "Sangeetha M",
    email: "sangeem@example.com",
    phoneNo: 9876543210,
    expertise: "Singing",
    experience: 3,
    bio: "I am a dedicated and passionate educator with three years of experience in teaching and coaching vocal training. As a singer, songwriter, and performer myself, I understand the unique challenges faced by aspiring musicians. My goal is to provide personalized guidance and support to help my students achieve their full potential. I am a constant learner, always seeking out new techniques and approaches to enhance my teaching skills. Whether you are a beginner or an experienced vocalist, I can help you reach your goals through creative and engaging lessons tailored to your specific needs",
    rating: 4.9,
    profileImage: "https://th.bing.com/th?id=OIF.Vt%2bAN%2bTtprQPshWG1IJAFg&rs=1&pid=ImgDetMain",
    registrationDate: "2023-02-20"
  },
  {
    instructorID: "6",
    userID: "3",
    name: "Twinkle Khanna",
    email: "twinklekhanna@example.com",
    phoneNo: 6543219807,
    expertise: "Music/Instruments",
    experience: 4,
    bio: "Passionate musician and instructor with extensive knowledge of various musical instruments and music theory.",
    rating: 4.8,
    profileImage: "https://thumbs.dreamstime.com/b/music-teacher-conducts-lesson-playing-musical-instrument-over-internet-isolated-white-background-flute-lessons-online-277020854.jpg",
    registrationDate: "2024-04-25"
  }

])


// Sample data for Students collection
if (!db.getCollectionNames().includes("students")) {
  db.createCollection('students');
}
studentsCollection = db.getCollection("students");
studentsCollection.remove({});
studentsCollection.insert([
  {
    studentID: "1001",
    userID: "8",
    studentName: "Raya Lewis",
    email: "rlewis@gmail.com",
    phoneNo: 1112223333,
    enrolledCourses: [1, 2],
    profileImage: "https://offertabs.s3.amazonaws.com/offer/qy9s4z/large/810_1920_6095afa41d80b-SeniorPic.JPG",
    registrationDate: new Date("2023-03-10")
  },
  {
    studentID: "1002",
    userID: "9",
    studentName: "Blake Lively",
    email: "blively@gmail.com",
    phoneNo: 4445556666,
    enrolledCourses: [2],
    profileImage: "https://media-exp1.licdn.com/dms/image/C4E03AQEPxLjmm6M2sQ/profile-displayphoto-shrink_800_800/0/1662048993002?e=2147483647&v=beta&t=KESd93Sz-hkYAdnp1xNTr2Y7wdbkB6MJx9WeFg-4HZ8",
    registrationDate: new Date("2023-04-05")
  },
  {
    studentID: "1003",
    userID: "10",
    studentName: "Ravyn Yew",
    email: "ryew@gmail.com",
    phoneNo: 2563698710,
    enrolledCourses: [3, 4],
    profileImage: "sampleimage",
    registrationDate: new Date("2024-04-25")
  }
]);


// Sample data for Events collection
if (!db.getCollectionNames().includes("events")) {
  db.createCollection('events');
}
eventsCollection = db.getCollection("events")
eventsCollection.remove({})
eventsCollection.insert([
  {
    eventID: "1",
    title: "Python Workshop",
    description: "Hands-on workshop for learning Python basics.",
    date: "2024-06-15",
    location: "Online",
    organizerID: "2",
    participants: [7, 8]
  },
  {
    eventID: "2",
    title: "Design Conference",
    description: "Annual design conference featuring industry experts.",
    date: "2024-07-20",
    location: "Virtual",
    organizerID: "2",
    participants: [8, 9]
  },
  {
    eventID: "3",
    title: "Hackathon",
    description: "Test your skills and challenge yourself at the hackathon!",
    date: "2024-06-28",
    location: "Online",
    organizerID: "7",
    participants: [7, 9]
  },
  {
    eventID: "4",
    title: "5v5 Soccer Match",
    description: "Get your team of 5 and play against the best.",
    date: "2024-05-26",
    location: "SeattleU field",
    organizerID: "8",
    participants: []
  }
])

// Sample data for Reviews collection
if (!db.getCollectionNames().includes("reviews")) {
  db.createCollection('reviews');
}
reviewsCollection = db.getCollection("reviews")
reviewsCollection.remove({})
reviewsCollection.insert([
  {
    reviewID: "1",
    userID: "7",
    courseID: "1",
    rating: 4,
    comment: "The Python class was quite informative. The instructor explained concepts clearly and provided useful examples. However, I felt that the pacing was a bit fast at times. Overall, it was a good learning experience."
  },
  {
    reviewID: "2",
    userID: "8",
    courseID: "1",
    rating: "5",
    comment: "Fantastic Python course! The instructor was engaging and made complex topics easy to understand. The hands-on exercises were particularly helpful in solidifying my understanding. Highly recommend this course to anyone interested in learning Python."
  },
  {
    reviewID: "3",
    userID: "7",
    courseID: "2",
    rating: 4.5,
    comment: "I thoroughly enjoyed the Graphic Design Fundamentals class. The instructor had a clear passion for the subject and presented the material in an engaging manner. The practical assignments helped me apply what I learned effectively. Overall, it was an enriching experience."
  },
  {
    reviewID: "4",
    userID: "8",
    courseID: "6",
    rating: 4,
    comment: "The Introduction to Criminal Law class provided a comprehensive overview of the subject. The instructor's expertise and real-world examples made complex legal concepts easy to understand. While the content was enriching, I would have liked more interactive elements in the course material."
  },
  {
    reviewID: "5",
    userID: "9",
    courseID: "3",
    rating: 4,
    comment: "I absolutely loved the basketball class! The instructor was very knowledgeable and supportive. I learned a lot and improved my skills significantly. Would highly recommend this class to anyone interested in basketball."
  },
  {
    reviewID: "6",
    userID: "9",
    courseID: "5",
    rating: 4,
    comment: "The Introduction to Finance class exceeded my expectations. The instructor's clear explanations and real-world examples helped demystify complex financial concepts. The interactive exercises and case studies provided practical insights into financial decision-making. I highly recommend this course to anyone looking to gain a solid foundation in finance."
  },
  {
    reviewID: '7',
    userID: "9",
    courseID: "4",
    rating: 4,
    comment: "The Guitar Basics class provided a solid introduction to playing the guitar. The instructor's step-by-step approach and clear demonstrations helped me grasp fundamental techniques quickly. The course materials were well-organized, and the practice exercises were valuable for building proficiency. I would recommend this class to anyone interested in starting their journey with the guitar."
  }
])
