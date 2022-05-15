import React, { useEffect, useState, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useCategorieën } from "../contexts/CategorieënProvider";
import { useTemplates } from "../contexts/TemplateProvider";
import { v4 } from "uuid";
import _ from "lodash";
import "../components/Test/test.css";
import "../css/template.css";
import Header from "../components/Header";
import { Navigate } from "react-router";
import { useNavigate } from "react-router-dom";

const item = {
  CATEGORIEID: v4(),
  NAME: "Categorie 1",
};

const item2 = {
  CATEGORIEID: v4(),
  NAME: "Categorie 2",
};
const item3 = {
  CATEGORIEID: v4(),
  NAME: "Categorie 3",
};
const item4 = {
  CATEGORIEID: v4(),
  NAME: "Categorie 4",
};
const template = {
  NAME: "Testcategorie",
  COLUMN: "todo",
  ROW: 0,
};
function Test() {
  const { loading, onlyCategories, getCategorieën } = useCategorieën();
  const { templates, updateTemplate } = useTemplates();
  const navigate = useNavigate();
  const [state, setState] = useState({
    allCats: {
      title: "Kolom 1",
      items: [],
    },
    col1: {
      title: "Kolom 2",
      items: [],
    },
    col2: {
      title: "Kolom 3",
      items: [],
    },
    col3: {
      title: "Kolom 4",
      items: [],
    },
    col4: {
      title: "Kolom 5",
      items: [],
    },
  });

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) {
      return;
    }

    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }

    // Creating a copy of item before removing it from state
    console.log(source.droppableId);
    const itemCopy = { ...state[source.droppableId].items[source.index] };
    setState((prev) => {
      prev = { ...prev };
      console.log(prev);
      // Remove from previous items array
      prev[source.droppableId].items.splice(source.index, 1);
      // Adding to new items array location
      prev[destination.droppableId].items.splice(
        destination.index,
        0,
        itemCopy
      );
      return prev;
    });
  };

  useEffect(() => {
    if (!loading) {
      setState((prevState) => {
        let allCats = Object.assign({}, prevState.allCats); // creating copy of state variable jasper
        let col1 = Object.assign({}, prevState.col1);
        let col2 = Object.assign({}, prevState.col2);
        let col3 = Object.assign({}, prevState.col3);
        let col4 = Object.assign({}, prevState.col4);
        console.log(onlyCategories);
        allCats.items = onlyCategories; // update the name property, assign a new value
        return { allCats, col1, col2, col3, col4 }; // return new object jasper object
      });
    }
  }, [onlyCategories, loading]);

  const handleUpdate = useCallback(async () => {
    try {
      updateTemplate(4, "Stakeholder", state);
      navigate("/template");
      getCategorieën();
    } catch (error) {
      console.error(error);
    }
  }, [state, navigate, updateTemplate]);

  return (
    <>
      <Header />
      <div className="template-main">
        <div className="template-header">
          <div className="text-box">
            <div className="title">Template Aanmaken</div>
          </div>
        </div>
      </div>
        {onlyCategories && (
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="categories-temp">
              {_.map(state, (data, key) => {
                return(
                  <>
                  {key.includes("allCats") && <div
                  key={key}
                  className="allCats"
                >
                  <Droppable droppableId={key} direction="horizontal">
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`droppable-col-all ${snapshot.isDraggingOver && "dropping" }`}
                      >
                        {data.items.map((el, index) => (
                          <Draggable key={el.NAME}
                            index={index}
                            draggableId={el.NAME}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`item-all ${
                                  snapshot.isDragging && "dragging"
                                }`}
                              >
                                {el.NAME}
                              </div>
                            )}
                          </Draggable>
                        ))}
                      </div>
                    )}
                  </Droppable>
                </div>}
                  </>
                );
              })}
            </div>
            <div className="App">
            {_.map(state, (data, key) => {
              return (
                <>
                {!key.includes("allCats") && <div
                  key={key}
                  className="column"
                >
                  <Droppable droppableId={key}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`droppable-col ${snapshot.isDraggingOver && "dropping" }`}
                        >
                          {
                            data.items.map((el, index) => {
                              return (
                                <Draggable
                                  key={el.NAME}
                                  index={index}
                                  draggableId={el.NAME}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        className={`item ${
                                          snapshot.isDragging && "dragging"
                                        }`}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        <span>{el.NAME}</span>
                                        <div className="template-sdg">
                                        {el.SDGICON?.map((sdg) => {
                                          return (
                                            <>
                                              <br></br>
                                              <img className="imageSmall" src={require(`../images/SDG${sdg}.PNG`)} alt={`SDG`} />
                                            </>
                                          );
                                        })}
                                      </div>
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>}
                </>
              );
            })}
            </div>
          </DragDropContext>
        )}
      
    </>
  );
}

export default Test;
