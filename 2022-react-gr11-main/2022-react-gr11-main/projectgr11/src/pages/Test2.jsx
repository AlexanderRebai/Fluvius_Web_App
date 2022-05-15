import React, { useEffect, useState, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useTemplates } from "../contexts/TemplateProvider";
import _ from "lodash";
import "../components/Test/test.css";
import "../css/template.css";

function Test({ temp }) {
  const {
    templates,
    loading,
    refreshTemplates,
    updateTemplate,
    categories,
    template,
    getTemplateByID,
  } = useTemplates();
  const [categorieIDs, setCategorieIDs] = useState([]);
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
    const itemCopy = { ...state[source.droppableId].items[source.index] };
    setState((prev) => {
      prev = { ...prev };
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
    if (!loading && template) {
      const arr = [];
      // template.TEMPLATE.forEach((temp) => console.log(temp));
      Object.keys(state).forEach((key, value) => {
        if (key !== "allCats") {
          state[key].items.forEach((item) => arr.push(item.CATEGORIEID));
        }
      });
      setCategorieIDs(arr);
    }
  }, [template, loading, state]);

  useEffect(() => {
    if (!loading && templates.length !== 0) {
      const test = templates.filter(
        (template) => template.ROLE === temp.ROLE
      )[0].TEMPLATE;
      test.allCats = {
        title: "Kolom 1",
        items: categories,
      };
      setState(test);
    }
  }, [templates, loading, temp, categories]);

  const handleSave = useCallback(
    async (temp) => {
      try {
        await updateTemplate(temp.ID, temp.ROLE, temp.TEMPLATE, categorieIDs);
        await refreshTemplates();
      } catch (error) {
        console.error(error);
      }
    },
    [refreshTemplates, updateTemplate, categorieIDs]
  );
  const handleDelete = useCallback(
    async (temp) => {
      console.log(template);
      try {
        await updateTemplate(
          temp.ID,
          temp.ROLE,
          {
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
          },
          []
        );
        await getTemplateByID(temp.ID);
        await refreshTemplates();
        console.log(template);
      } catch (error) {
        console.error(error);
      }
    },
    [refreshTemplates, updateTemplate, getTemplateByID]
  );

  return (
    <>
      <div className="temp-btns">
        <button className="save-btn" onClick={() => handleSave(temp)}>
          Save
        </button>
        <button className="delete-btn" onClick={() => handleDelete(temp)}>
          Reset
        </button>
      </div>

      {templates && categories && (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="categories-temp">
            {_.map(state, (data, key) => {
              return (
                <>
                  {key.includes("allCats") && (
                    <div key={key} className="allCats">
                      <Droppable droppableId={key} direction="horizontal">
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`droppable-col-all ${
                              snapshot.isDraggingOver && "dropping"
                            }`}
                          >
                            {data.items.map((el, index) => (
                              <Draggable
                                key={el.NAME}
                                index={index}
                                draggableId={el.NAME}
                              >
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
                    </div>
                  )}
                </>
              );
            })}
          </div>
          <div className="App">
            {_.map(state, (data, key) => {
              return (
                <>
                  {!key.includes("allCats") && (
                    <div key={key} className={"column"}>
                      <Droppable droppableId={key}>
                        {(provided, snapshot) => {
                          return (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className={`droppable-col ${
                                snapshot.isDraggingOver && "dropping"
                              }`}
                            >
                              {data.items.map((el, index) => {
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
                                                  <img
                                                    className="image"
                                                    src={require(`../images/SDG${sdg}.PNG`)}
                                                    alt={`SDG`}
                                                  />
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
                    </div>
                  )}
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
