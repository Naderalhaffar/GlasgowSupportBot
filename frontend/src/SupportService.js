import React from 'react';
import './SupportService.css'; 

const SupportService = () => {
  return (
    <div className="support-service-container">
      <header className="support-service-header">
        <h1>University of Glasgow Support Services</h1>
      </header>

      {/* THE DISABILITY SERVICE Section */}
      <section className="service-section">
        <h2>The Disability Service</h2>
        <p>Supporting students with disabilities, chronic medical conditions, physical or sensory impairments, mental health difficulties, or specific learning difficulties to ensure equal access to educational opportunities.</p>
        
        <h3>Potential Questions to Ask:</h3>
        <ul>
          <li>How to register for support and the necessary documentation.</li>
          <li>Information on the Disabled Students' Allowance (DSA).</li>
          <li>Accessibility features and facilities on campus.</li>
          <li>Available assistive technology and training.</li>
          <li>Process for arranging exam accommodations.</li>
          <li>Financial assistance and DSA claims process.</li>
          <li>Support options for international students.</li>
          <li>Guidance on how to get support and advice.</li>
          <li>Contact information for the Disability Service.</li>
        </ul>
      </section>

      {/* Good Cause Section */}
      <section className="service-section">
        <h2>Good Cause</h2>
        <p>Understanding and navigating the Good Cause claim process for circumstances that impact academic performance.</p>
        
        <h3>Key Areas of Inquiry:</h3>
        <ul>
          <li>What circumstances would be considered Good Cause?</li>
          <li>What circumstances would not be considered Good Cause?</li>
          <li>What is the timeline for Good Cause Claims?</li>
          <li>What do I need to include in my Good Cause claim?</li>
          <li>Who will see my Good Cause claim?</li>
          <li>What outcomes might come from my Good Cause claim?</li>
          <li>I am unwell and have a piece of coursework due. Can I request an extension?</li>
          <li>Difficulties affecting dissertation/project work. Can I claim Good Cause?</li>
          <li>I expect a poor grade due to difficult circumstances. What can I do?</li>
          <li>Impact of illness, bereavement, or family crises on exams and coursework.</li>
          <li>Consideration of long-term or chronic circumstances as Good Cause.</li>
          <li>Supporting evidence for a Good Cause claim and confidentiality concerns.</li>
          <li>Outcomes and potential adjustments following a successful Good Cause claim.</li>
          <li>Understanding the implications of declined Good Cause claims and options thereafter.</li>
          <li>Procedure for cancelling a Good Cause claim, if necessary.</li>
        </ul>
      </section>

      {/* INTERNATIONAL STUDENTS Section */}
      <section className="service-section">
        <h2>International Students</h2>
        <p>The International Student Support team provides specialized advice and information for international students and their dependants, covering a wide range of issues from welfare, immigration, and financial concerns to understanding UK and Scottish culture.</p>
        
        <h3>Key Areas of Inquiry:</h3>
        <ul>
          <li>General information about CAS (Confirmation of Acceptance for Studies) and its application process.</li>
          <li>Guidance on visa and immigration, including eligibility to apply for a Student Visa inside the UK.</li>
          <li>Understanding academic progression requirements for visa applications.</li>
          <li>Maintenance requirements and financial evidence needed for a Student Visa.</li>
          <li>Procedure for making an "in-time" Student Visa application and what documents to include.</li>
          <li>Insights into tuition and accommodation fee payments as they relate to your CAS and visa application.</li>
          <li>Advice on applying for a Student Visa outside the UK, including when to apply and visa processing times.</li>
          <li>Information on ATAS applications, if required for your course.</li>
          <li>Understanding the eligibility requirements and process for applying for a Student Visa inside the UK.</li>
          <li>Details on Schengen Visas for travel within the Schengen Area, including when and how to apply.</li>
        </ul>
        
        <p>For further details, including contact information and guidance documents, international students are encouraged to visit the <a href="https://www.gla.ac.uk/international/support/">International Student Support website</a>.</p>
      </section>

          {/* MENTAL HEALTH SERVICES AND INFORMATION Section */}
          <section className="service-section">
        <h2>Mental Health and Services Information</h2>
        <p>Accessing mental health support services, self-help resources, and information on counseling, crisis support, and peer wellbeing support.</p>
        
        <h3>Potential Questions to Ask:</h3>
        <ul>
          <li>How to register for counseling and psychological services.</li>
          <li>Availability of crisis support and how to access it.</li>
          <li>Information on Togetherall and how to join the online community.</li>
          <li>Accessing self-help resources for various mental health issues.</li>
          <li>Guidance on when to consult a General Practitioner for mental health support.</li>
          <li>Availability of peer wellbeing support and how to book a session.</li>
        </ul>
        
        <p>For more details and specific contact information, please refer to the <a href="https://www.gla.ac.uk/myglasgow/counselling/">University of Glasgow Counselling Service</a> and <a href="https://www.gla.ac.uk/myglasgow/peersupport/">Peer Wellbeing Support website</a>.</p>
      </section>

        {/* PEER WELLBEING SUPPORT Section */}
        <section className="service-section">
        <h2>Peer Wellbeing Support</h2>
        <p>Peer Wellbeing Supporters are students who have been recruited and received 27 hours of specialized, evidence-based training by qualified counsellors/psychotherapists to equip them for the role.</p>
        
        <h3>Potential Questions to Ask:</h3>
        <ul>
            <li>How can I access Peer Wellbeing Support?</li>
            <li>What kind of training do Peer Wellbeing Supporters receive?</li>
            <li>Can Peer Wellbeing Supporters help with specific mental health issues?</li>
            <li>How do I book a Peer Wellbeing Support Session?</li>
            <li>What can I expect during a Peer Wellbeing Support session?</li>
        </ul>
        </section>

        {/* STUDENTS WITH CARING RESPONSIBILITIES Section */}
        <section className="service-section">
        <h2>Students With Caring Responsibilities</h2>
        <p>The University has a Student Parents & Carers page which outlines how the university can support students in balancing their caring responsibilities with their studies. The University is committed to providing as much flexibility as possible to facilitate students' success, making sure no student is disadvantaged.</p>
        
        <h3>Potential Questions to Ask:</h3>
        <ul>
            <li>How can the university support students with caring responsibilities?</li>
            <li>Are there any grants available for students with caring responsibilities?</li>
            <li>Where can I find more information about support for student parents and carers?</li>
            <li>Can the university provide childcare support for student parents?</li>
            <li>How do I apply for financial assistance through the Discretionary Fund?</li>
        </ul>
        </section>
        {/* STUDENT PARENTS Section */}
        <section className="service-section">
        <h2>Student Parents</h2>
        <p>The University has a Student Parents & Carers page that provides guidance for students who are parents or guardians of children under the age of 18. </p>
        
        <h3>Potential Questions to Ask:</h3>
        <ul>
            <li>Where can I find information and guidance for student parents at the University?</li>
            <li>What support is available for student parents in terms of childcare?</li>
            <li>How can I apply for grants towards childcare costs?</li>
            <li>What is the Family Study Lounge and where is it located?</li>
            <li>Are there any specific rules or guidelines for using the Family Study Lounge?</li>
        </ul>
        </section>

        {/* STUDY SUPPORT Section */}
        <section className="service-section">
        <h2>Student Learning Development Service</h2>
        <p>The Student Learning Development Service (SLD) offers study and writing advice for students.</p>
        
        <h3>Potential Questions to Ask:</h3>
        <ul>
            <li>How can I access study support services provided by the Student Learning Development Service?</li>
            <li>What type of advice and assistance does the SLD offer?</li>
            <li>Can I get help with academic writing, critical analysis, or scientific presentations?</li>
            <li>How do I schedule an appointment with an Adviser?</li>
            <li>Are there any workshops or classes available to improve study skills?</li>
        </ul>
        </section>
        {/* GLASGOW CAREERS SERVICE Section */}
        <section className="service-section">
        <h2>Glasgow Careers Service</h2>
        <p>The Glasgow Careers Service is dedicated to supporting students and graduates in their career journeys, offering a range of services to enhance employability and career prospects.</p>
        
        <h3>Potential Questions to Ask:</h3>
        <ul>
            <li>How can I make an appointment with a careers advisor at Glasgow?</li>
            <li>What types of workshops are available through the Glasgow Careers Service?</li>
            <li>Can you tell me more about the career mentoring program?</li>
            <li>How does the Glasgow Careers Service support with CV writing and interview preparation?</li>
            <li>What online resources does the Glasgow Careers Service offer for job searching?</li>
            <li>Are there any specific services for international students by the Glasgow Careers Service?</li>
            <li>How can I access the Glasgow Careers Service's job portal?</li>
            <li>What kind of support is available for students interested in entrepreneurship?</li>
            <li>How does the Glasgow Careers Service assist with graduate job placements?</li>
            <li>Are there any industry networking events or employer presentations hosted by the Glasgow Careers Service?</li>
        </ul>
        </section>

    </div>
  );
};

export default SupportService;
