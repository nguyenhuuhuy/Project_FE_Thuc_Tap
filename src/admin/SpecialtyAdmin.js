import React, { useEffect, useState } from "react";
import "./style/specialtyAdmin.css";
import {
  getDetailSpecialtyById,
  getListSpecialtyAdmin,
  getSearchSpecialty,
  postSpecialty,
  putSpecialtyById,
} from "../service/specialtyService";

function SpecialtyAdmin() {
  const [active, setActive] = useState(false);
  const [activeEdit, setActiveEdit] = useState(false);
  const [listSpecialty, setListSpecialty] = useState();
  const [createSpecialty, setCreateSpecialty] = useState({
    id: "",
    name: "",
  });
  const [searchSpecialty, setSearchSpecialty] = useState({
    searchName: "",
  });
  const [editSpecialty, setEditSpecialty] = useState({
    nameEdit: "",
  });
  const { name } = createSpecialty;

  function dataListSpecialty() {
    getListSpecialtyAdmin().then((res) => {
      setListSpecialty(res.data);
    });
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    dataListSpecialty();
  }, []);

  let renderListSpecialty = null;
  if (listSpecialty == undefined) {
    renderListSpecialty = null;
  } else {
    renderListSpecialty = listSpecialty.map((e, index) => {
      return (
        <tr style={{ textAlign: "center" }} key={index}>
          <td>{index + 1}</td>
          <td>{e.name}</td>
          <td>
            <button type="button" class="btn btn-outline-primary" onClick={() => handleEdit(e.id)}>
              edit
            </button>
          </td>
        </tr>
      );
    });
  }
  const handleCreateOpen = () => {
    setActive(!active);
  };
  const handleClose = () => {
    setActive(!active);
  };

  const handleCloseEdit = () => {
    setActiveEdit(!activeEdit);
  };
  const handleInputChange = (e) => {
    setCreateSpecialty({ ...createSpecialty, [e.target.name]: e.target.value });
  };
  const handleInputChangeEdit = (e) => {
    setEditSpecialty({ ...editSpecialty, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let newSpecialty = {
      name: createSpecialty.name,
    };
    postSpecialty(newSpecialty)
      .then((res) => {
        if (res.data.message == "name_existed") {
          alert("specialty name existed !!!!");
        } else {
          dataListSpecialty();
          setCreateSpecialty({
            name: "",
          });
          setActive(!active);
          alert("Create success !!!!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = (id) => {
    getDetailSpecialtyById(id)
      .then((res) => {
        setActiveEdit(!activeEdit);
        setEditSpecialty({
          id: res.data.id,
          nameEdit: res.data.name,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmitEdit = (e) => {
    e.preventDefault();
    let edit = {
      name: editSpecialty.nameEdit,
    };
    putSpecialtyById(editSpecialty.id, edit)
      .then((res) => {
        if (res.data.message == "no_change") {
          alert("the name has not changed!!!");
        } else if (res.data.message == "name_existed") {
          alert("specialty name existed !!!!");
        } else {
          alert("update success!!!");
          dataListSpecialty();
          setActiveEdit(!activeEdit);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearchChange = (e) => {
    setSearchSpecialty({ ...searchSpecialty, [e.target.name]: e.target.value });
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    let search = {
      name: searchSpecialty.searchName,
    };
    getSearchSpecialty(search.name)
      .then((res) => {
        if (res.data.message == "not_found") {
          alert("specialty name exited");
          dataListSpecialty();
        } else {
          setListSpecialty(res.data);
        }
      })
      .catch((err) => {
        dataListSpecialty();
      });
  };
  return (
    <>
      <div className="col-12" style={{marginTop:'10%',marginBottom:'2%'}}>
        <div className="col-xs-8 col-xs-offset-2 well" style={{ justifyContent: "center" }}>
          <form
            className="form-inline my-2 my-lg-0"
            onSubmit={(e) => {
              handleSearchSubmit(e);
            }}
          >
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              name="searchName"
              value={searchSpecialty.searchName}
              onChange={(e) => handleSearchChange(e)}
              required
            />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
          <table className="table table-scroll table-striped">
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th>#</th>
                <th>Name</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>{renderListSpecialty}</tbody>
          </table>
        </div>
      </div>
      <button
        type="button"
        class="btn btn-primary btn-lg btn-block"
        style={{ marginTop: "100px",marginBottom:'5%' }}
        onClick={handleCreateOpen}
      >
        create specialty
      </button>
      <div className="cotainer" id={active ? "from_Specialty" : "from_Specialty_close"}>
        <div className="row" style={{ justifyContent: "center" }}>
          <div className="col-6">
            <i
              class="fa-solid fa-xmark"
              style={{ marginLeft: "100%", fontSize: "30px" }}
              onClick={handleClose}
            ></i>
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
              style={{ textAlign: "center" }}
            >
              <div className="mb-3">
                <h2 htmlFor="exampleInputEmail1" className="form-label">
                  Specialty Name
                </h2>
                <input
                  type="text"
                  className="form-control"
                  required
                  name="name"
                  value={name}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <div
        className="cotainer"
        id={activeEdit ? "from_Edit_Specialty" : "from_Edit_Specialty_close"}
      >
        <div className="row" style={{ justifyContent: "center" }}>
          <div className="col-6">
            <i
              class="fa-solid fa-xmark"
              style={{ marginLeft: "100%", fontSize: "30px" }}
              onClick={handleCloseEdit}
            ></i>
            <form
              onSubmit={(e) => {
                handleSubmitEdit(e);
              }}
              style={{ textAlign: "center" }}
            >
              <div className="mb-3">
                <h2 htmlFor="exampleInputEmail1" className="form-label">
                  Specialty Name
                </h2>
                <input
                  type="text"
                  className="form-control"
                  required
                  name="nameEdit"
                  value={editSpecialty.nameEdit}
                  onChange={(e) => handleInputChangeEdit(e)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Edit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SpecialtyAdmin;
