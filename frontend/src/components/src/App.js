import React, { useState } from 'react';
import Header from './Header';
import FAQ from './FAQ';
import Footer from './Footer'

function App () {
  const [faqs, setfaqs] = useState([
    {
      question: 'How to create your own Vbook?',
      answer: 'Step 1:To create your Vbook you can contact us in, Step 2: You can join us as a teacher and fill in the form in teachers section, Step 3: Then We will contact you.',
      open: false
    },
    {
      question: 'What are the requirements to become teacher here ?',
      answer: "You don't need any degree, You must have a sound knowledge about the topic, You must be able to explain in both English and Hindi. Further support will be given to you by us if required.",
      open: false
    },
    {
      question: 'How to make an account on vbook ?',
      answer: 'Step1: Go to the top-right corner of the website and click on login. Step 2: Create your account. Step 3: Fill in with required information. Step 4: Your account is ready and now you become our customer.',
      open: false
    },
    {
      question: 'How to contact us for any doubt ?',
      answer: 'Way 1: You can contact us on our social media handles, emails as well as given contact number, Way 2: You can also fill the query form given below and you wlll the solution as soon as possible.',
      open: false
    },
    {
      question: 'Who are our most valuable customers?',
      answer: 'The students are our most valuable customers. Note: For the time being only Class 11 and 12',
      open: false
    },
    {
      question: 'What is Vchat?',
      answer: 'Vchat is a chat group created for students to interact with teachers associated with the respective courses. Note: Only enrolled students can access this chat group.',
      open: false
    },
    {
      question: 'What is Vbook?',
      answer: 'Vbook is a specialised e-book with a combination of text, picture, audio as well as video.It also provides additional reference videos for each topic for better learning.It also have short-note along with audio and text explanation.',
      open: false
    },
    {
      question: 'For what purpose can we use Vbook?',
      answer: 'At the time of revision it becomes very difficult to revise with big notes so you can use Vbook for effective and efficient revision using the combination of text, audio, picture and video along with short note and additional videos features of Vbook.',
      open: false
    },
    {
      question: 'How to access Vbook?',
      answer: "You don't need to login for accessing the first 5 Vbooks but for accessing more than 5 you need to login into the website by creating your account.",
      open: false
    },
    {
      question: 'What is the purpose of using this website?',
      answer: "This website is built keeping in mind the student's mindset which  provide you with an ambience for your valuable time saving and effective learning.",
      open: false
    }
  ]);

  const toggleFAQ = index => {
    setfaqs(faqs.map((faq, i) => {
      if (i === index) {
        faq.open = !faq.open
      } else {
        faq.open = false;
      }

      return faq;
    }))
  }


  return (
    <div className="App">
      <Header />
      <div className="faqs">
        {faqs.map((faq, i) => (
          <FAQ faq={faq} index={i} toggleFAQ={toggleFAQ} />
        ))}
        <Footer/>
      </div>
    </div>
  );
}

export default App;
