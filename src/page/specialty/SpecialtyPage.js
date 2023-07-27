import React, { useEffect, useState } from "react";
import "../../style/specialty.css";
import { getListPageSpecialty } from "../../service/specialtyService";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { useNavigate } from "react-router-dom";
function SpecialtyPage() {
  const navigate = useNavigate();
  const [postContent, setPostContent] = useState({
    content: [],
    totalPages: "",
    totalElements: "",
    pageable: {
      pageNumber:"",
      pageSize:""
    },
    last: false,
  });
  function SpecialtyData() {
    getListPageSpecialty().then((res) => {
      setPostContent(res.data);
    });
  }
  useEffect(() => {
    SpecialtyData();
  }, []);

  


  const changePage = (pageNumber = 0, pageSize = 3) => {
      if (pageNumber > postContent.pageable.pageNumber && postContent.last) {
        return;
      }
      if (pageNumber < postContent.pageable.pageNumber && postContent.pageable.pageNumber == 0) {
        return;
      }
    getListPageSpecialty(pageNumber,pageSize).then((res)=>{
      setPostContent(res.data)
      window.scroll(0,0)
    }).catch((err)=>{
      console.log(err);
    })
  };

  const handleDetail = (id)=>{
    navigate(`/specialty/${id}`);
  }
  return (
    <>
      <section>
        <div className="container">
          <div className="section-heading title-style4 border-bottom padding-25px-bottom sm-padding-15px-bottom">
            <h3>
              <span>Our</span> Services
            </h3>
          </div>
          <div className="row mt-60">
            {/* {render} */}
            {postContent.content.map((post, index) => (
              <div
                className="col-lg-4 col-md-6 sm-margin-30px-bottom xs-margin-20px-bottom"
                key={index}
                style={{ marginBottom: "1%" }}
              >
                <div className="service-block4 h-100">
                  <div className="service-icon">
                    <i className="icon-mobile" />
                  </div>
                  <div className="service-desc">
                    <button style={{ border: "none" }} onClick={()=>handleDetail(post.id)}>{post.name}</button>
                    <h5></h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Pagination>
          <PaginationItem
            disabled={postContent.pageable.pageNumber == 0}
            onClick={() => changePage(postContent.pageable.pageNumber - 1)}
          >
            <PaginationLink previous></PaginationLink>
          </PaginationItem>
          {[...Array(postContent.totalPages)].map((item, index) => (
            <PaginationItem
              onClick={() => changePage(index)}
              active={index == postContent.pageable.pageNumber}
              key={index}
            >
              <PaginationLink>{index + 1}</PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem
            disabled={postContent.last}
            onClick={() => changePage(postContent.pageable.pageNumber + 1)}
          >
            <PaginationLink next></PaginationLink>
          </PaginationItem>
        </Pagination>
      </section>
    </>
  );
}

export default SpecialtyPage;
