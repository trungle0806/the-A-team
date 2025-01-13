import React, { useEffect, useState } from 'react';  
import "./Describe.css";  
import Header from '../../Components/Header/Header';  
import Footer from '../../Components/Footer/Footer';  
import axios from 'axios';

const Describe = () => {  
  const [comments, setComments] = useState([]);  
  const [commentContent, setCommentContent] = useState('');
  
  // Fetching comments from the server when the page loads
  useEffect(() => {  
    const fetchComments = async () => {  
      try {  
        const response = await axios.get('http://localhost:3000/api/comments');  
        setComments(response.data);  
      } catch (error) {  
        console.error('Error fetching comments:', error);  
      }  
    };  

    fetchComments();  
  }, []);  

  // Handling comment submission
  const handleCommentSubmit = async () => {  
    if (commentContent.trim()) {  
      const newComment = {  
        content: commentContent,  
        userName: "Turnio DEV",  
        userAvatar: "https://lh3.googleusercontent.com/d/1XmIaSt4u8ZKzPTiPQCR0KNUbZpPfmtV5=s50",  
      };  

      try {  
        const response = await axios.post('http://localhost:3000/api/comments', newComment);  
        setComments([response.data, ...comments]);  
        setCommentContent('');  
      } catch (error) {  
        console.error('Error posting comment:', error);  
      }  
    }  
  };  

  return (  
    <div>  
      <Header />  
      <div className="describe-page">  
        <div className="container1">  
          <div className="hero">  
            <div className="hero-content">  
              <h1>Animal Welfare Fund</h1>  
              <p>  
                Animal welfare is closely linked to ethical, environmental, and public health concerns.  
                Our Animal Welfare Fund supports organizations that are committed to protecting and improving the lives of animals, especially farmed and wild animals.  
              </p>  
              <a className="donateButton1" href="http://localhost:3000/donate/3">Donate to Fund</a>  
            </div>  
            <img  
              className="hero-image"  
              src="https://www.charitynavigator.org/adobe/dynamicmedia/deliver/dm-aid--d19fcd1f-2884-407a-9cef-2bfcd801c1b7/shutterstock_2474137865.jpg.webp?width=760&preferwebp=true"  
              alt="Pig"  
            />  
          </div>  
        </div>  

        <div id="about-fund" className="about-fund">  
          <div className='about-fund1'>  
            <h2>About the Animal Welfare Fund</h2>  
            <p>  
              The Animal Welfare Fund is devoted to advancing the well-being of animals by supporting organizations that utilize evidence-based strategies to protect and enhance the lives of both farmed and wild animals. Our mission is to foster a compassionate world where animals are treated with dignity and respect.  
            </p>  
            <h3>Innovation:</h3>  
            <p>  
              We emphasize innovative approaches that are backed by research and have been proven to be effective in addressing the challenges animals face. The organizations we support are pioneers in implementing programs that bring tangible benefits to animal welfare.  
            </p>  
            <h3>Commitment and Transparency:</h3>  
            <p>  
              Our fund is committed to transparency and accountability. We carefully select organizations that demonstrate measurable impacts and adhere to the highest standards of effectiveness in their operations. Regular reporting ensures that donors can see the real difference their contributions are making.  
            </p>  
            <h3>Invest in the Future:</h3>  
            <p>  
              By contributing to the Animal Welfare Fund, you are investing in a future where animals can live free from suffering. Join us in this vital mission and help us create lasting change by supporting groundbreaking projects and dedicated organizations.  
            </p>  
          </div>  
        </div>  

        <div className='commitment'>  
          <div className="describe-container">  
            <div className="describe-heading">  
              Discover Charities Featured on our Curated Lists  
            </div>  
            <div className="describe-subheading">  
              Find and support a charity responding to a crisis or current event or addressing a cause area close to your heart.  
            </div>  
            <a className="discover" href="http://localhost:3000/ngos">Explore now</a>  
          </div>  

          {/* Comment section */}
          {/* <div className="comment-section">  
            <h2>Comment</h2>  
            <div className='describe-comment'>  
              <textarea   
                id="comment_textarea"   
                value={commentContent}   
                onChange={(e) => setCommentContent(e.target.value)}   
                placeholder="Viết bình luận của bạn..."   
                rows="4"  
              ></textarea>  
              <button id="comment_submit" onClick={handleCommentSubmit}>Send comment</button>  
            </div>  
            <div className="comment_wrapper">  
              {comments.map((comment, index) => (  
                <div key={index} className="comment_item">  
                  <p>  
                    <a>  
                      <img src={comment.userAvatar} alt="User avatar" />  
                      <span>{comment.userName}</span>  
                    </a>  
                    <time>{new Date(comment.createdAt).toLocaleString()}</time>  
                  </p>  
                  <p>{comment.content}</p>  
                </div>  
              ))}  
            </div>  
          </div>   */}
        </div>  
      </div>  
      <Footer />  
    </div>  
  );  
};  

export default Describe;
