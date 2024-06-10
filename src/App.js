// import React, { useState, useEffect } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import "./App.css";

// const initialData = [
//   { id: "item-1", content: "Item 1" },
//   { id: "item-2", content: "Item 2" },
//   { id: "item-3", content: "Item 3" },
//   { id: "item-4", content: "Item 4" },
//   { id: "item-5", content: "Item 5" },
//   { id: "item-6", content: "Item 6" },
//   { id: "item-7", content: "Item 7" },
//   { id: "item-8", content: "Item 8" },
//   { id: "item-9", content: "Item 9" },
// ];

// const reorder = (list, startIndex, endIndex) => {
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);
//   return result;
// };

// const grid = 8;

// const getItemStyle = (isDragging, draggableStyle) => ({
//   userSelect: "none",
//   padding: grid * 2,
//   margin: `0 0 ${grid}px 0`,
//   background: isDragging ? "lightgreen" : "grey",
//   position: isDragging ? "fixed" : "relative", // Add this line
//   top: isDragging ? draggableStyle.top : 'auto', // Add this line
//   left: isDragging ? draggableStyle.left : 'auto', // Add this line
//   ...draggableStyle,
// });

// const getListStyle = (isDraggingOver) => ({
//   background: isDraggingOver ? "lightblue" : "lightgrey",
//   padding: grid,
//   width: 250,
// });

// const App = () => {
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     setItems(initialData);
//   }, []);

//   const onDragEnd = (result) => {
//     if (!result.destination) {
//       return;
//     }

//     const reorderedItems = reorder(
//       items,
//       result.source.index,
//       result.destination.index
//     );

//     setItems(reorderedItems);
//   };

//   return (
//     <div className="main_content">
//       <DragDropContext onDragEnd={onDragEnd}>
//         <Droppable droppableId="droppable">
//           {(provided, snapshot) => (
//             <div
//               {...provided.droppableProps}
//               ref={provided.innerRef}
//               style={getListStyle(snapshot.isDraggingOver)}
//             >
//               {items.map((item, index) => (
//                 <Draggable key={item.id} draggableId={item.id} index={index}>
//                   {(provided, snapshot) => (
//                     <div
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                       style={getItemStyle(
//                         snapshot.isDragging,
//                         provided.draggableProps.style
//                       )}
//                     >
//                       {item.content}
//                     </div>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//       </DragDropContext>
//     </div>
//   );
// };

// export default App;

// import React, { useState } from 'react';
// import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
// import './App.css'; // Make sure to style your container and items as needed

// const initialItems = [
//   { id: '1', content: 'Item 1', position: { x: 100, y: 100 } },
//   { id: '2', content: 'Item 2', position: { x: 100, y: 100 } },
//   { id: '3', content: 'Item 3', position: { x: 300, y: 300 } },
// ];

// const App = () => {
//   const [items, setItems] = useState(initialItems);

//   const handleDragEnd = (result) => {
//     if (!result.destination) return;

//     const { draggableId, source, destination } = result;
//     const itemIndex = items.findIndex(item => item.id === draggableId);

//     // Get the new position based on the mouse's coordinates
//     const newPosition = {
//       x: destination.x,
//       y: destination.y,
//     };

//     const updatedItems = [...items];
//     updatedItems[itemIndex] = {
//       ...updatedItems[itemIndex],
//       position: newPosition,
//     };

//     setItems(updatedItems);
//   };

//   return (
//     <DragDropContext onDragEnd={handleDragEnd}>
//       <Droppable droppableId="droppable" type="ITEMS" isDropDisabled>
//         {(provided) => (
//           <div
//             ref={provided.innerRef}
//             style={{
//               position: 'relative',
//               width: '100%',
//               height: '100vh',
//               border: '1px solid red',
//             }}
//             {...provided.droppableProps}
//           >
//             {items.map((item, index) => (
//               <Draggable key={item.id} draggableId={item.id} index={index}>
//                 {(provided, snapshot) => {
//                   const { x, y } = item.position;
//                   return (
//                     <div
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                       style={{
//                         position: 'absolute',
//                         left: x,
//                         top: y,
//                         padding: '8px',
//                         margin: '8px',
//                         backgroundColor: snapshot.isDragging ? 'lightgreen' : 'lightgrey',
//                         ...provided.draggableProps.style,
//                       }}
//                     >
//                       {item.content}
//                     </div>
//                   );
//                 }}
//               </Draggable>
//             ))}
//             {provided.placeholder}
//           </div>
//         )}
//       </Droppable>
//     </DragDropContext>
//   );
// };

// export default App;



// import React, { useState } from "react";
// import { DndProvider, useDrag, useDrop } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { Rnd } from "react-rnd";

// const App = () => {
//   const [droppedItems, setDroppedItems] = useState([]);
//   const [selectedBox, setSelectedBox] = useState(null);
//   const [rows, setRows] = useState(3);
//   const [cols, setCols] = useState(3);
//   const [rowHeights, setRowHeights] = useState(Array(3).fill(100));
//   const [colWidths, setColWidths] = useState(Array(3).fill(100));

//   const handleDrop = (item, monitor) => {
//     const delta = monitor.getClientOffset();
//     const dropPosition = {
//       x: delta.x - 200, // Adjust according to your layout
//       y: delta.y - 16, // Adjust according to your layout
//     };
//     setDroppedItems((prevItems) => [
//       ...prevItems,
//       {
//         ...item,
//         ...dropPosition,
//         id: `${item.id}-${prevItems.length}`,
//         width: item.width,
//         height: item.height,
//         text: item.text || "",
//       },
//     ]);
//   };

//   const DraggableBox = ({ id, width, height, text }) => {
//     const [{ isDragging }, drag] = useDrag(() => ({
//       type: "BOX",
//       item: { id, width, height, text },
//       collect: (monitor) => ({
//         isDragging: !!monitor.isDragging(),
//       }),
//     }));

//     return (
//       <div
//         ref={drag}
//         style={{
//           width,
//           height,
//           opacity: isDragging ? 0.5 : 1,
//           cursor: "move",
//           background: "white",
//           border: "2px dashed blue",
//           marginBottom: "8px",
//           position: "relative",
//         }}
//       ></div>
//     );
//   };

//   const DroppableArea = ({ onDrop, children }) => {
//     const [{ isOver }, drop] = useDrop(() => ({
//       accept: "BOX",
//       drop: (item, monitor) => {
//         onDrop(item, monitor);
//       },
//       collect: (monitor) => ({
//         isOver: !!monitor.isOver(),
//       }),
//     }));

//     const gridStyle = {
//       display: "grid",
//       gridTemplateRows: rowHeights.map((h) => `${h}px`).join(" "),
//       gridTemplateColumns: colWidths.map((w) => `${w}px`).join(" "),
//       width: "100%",
//       height: "100%",
//       position: "relative",
//       border: "2px solid black",
//     };

//     return (
//       <div ref={drop} style={gridStyle}>
//         {children}
//       </div>
//     );
//   };

//   const ResizableAndDraggableComponent = ({
//     id,
//     width,
//     height,
//     x,
//     y,
//     text,
//   }) => {
//     const [dimensions, setDimensions] = useState({ width, height });
//     const [position, setPosition] = useState({ x, y });
//     const [currentDimensions, setCurrentDimensions] = useState(null);
//     const [currentText, setCurrentText] = useState(text);

//     const handleDoubleClick = () => {
//       setSelectedBox({
//         id,
//         width: dimensions.width,
//         height: dimensions.height,
//       });
//     };

//     const handleResizeStop = (e, direction, ref, delta, position) => {
//       const newDimensions = {
//         width: ref.offsetWidth,
//         height: ref.offsetHeight,
//       };
//       setDimensions(newDimensions);
//       setPosition(position);
//       setDroppedItems((prevItems) =>
//         prevItems.map((item) =>
//           item.id === id
//             ? {
//                 ...item,
//                 width: newDimensions.width,
//                 height: newDimensions.height,
//                 x: position.x,
//                 y: position.y,
//               }
//             : item
//         )
//       );
//       setSelectedBox({
//         id,
//         width: newDimensions.width,
//         height: newDimensions.height,
//       });
//       setCurrentDimensions(null); // Clear current dimensions after resizing
//     };

//     const handleClick = () => {
//       setSelectedBox({
//         id,
//         width: dimensions.width,
//         height: dimensions.height,
//       });
//     };

//     const handleTextChange = (e) => {
//       const newText = e.target.value;
//       setCurrentText(newText);
//       setDroppedItems((prevItems) =>
//         prevItems.map((item) =>
//           item.id === id ? { ...item, text: newText } : item
//         )
//       );
//     };

//     return (
//       <Rnd
//         size={{ width: dimensions.width, height: dimensions.height }}
//         position={{ x: position.x, y: position.y }}
//         minWidth={10}
//         minHeight={10}
//         onDragStop={(e, d) => {
//           setPosition({ x: d.x, y: d.y });
//           setDroppedItems((prevItems) =>
//             prevItems.map((item) =>
//               item.id === id ? { ...item, x: d.x, y: d.y } : item
//             )
//           );
//         }}
//         onResize={(e, direction, ref, delta, position) => {
//           const newDimensions = {
//             width: ref.offsetWidth,
//             height: ref.offsetHeight,
//           };
//           setCurrentDimensions(newDimensions);
//         }}
//         onResizeStop={handleResizeStop}
//         onDoubleClick={handleDoubleClick}
//         onClick={handleClick}
//         style={{
//           border: "1px dashed blue",
//         }}
//       >
//         <div
//           style={{
//             width: "100%",
//             height: "100%",
//             background: "white",
//             position: "relative",
//           }}
//         >
//           <input
//             type="text"
//             value={currentText}
//             onChange={handleTextChange}
//             placeholder="Text here"
//             style={{
//               width: "100%",
//               height: "100%",
//               color: "black",
//               backgroundColor: "lightyellow",
//               border: "none",
//               outline: "none",
//               boxSizing: "border-box",
//               padding: "4px",
//             }}
//           />
//           {/* <input>rdfvh</input> */}
//           {currentDimensions && (
//             <div
//               style={{
//                 position: "absolute",
//                 top: "0",
//                 right: "-120px",
//                 background: "lightgray",
//                 padding: "5px",
//                 border: "1px solid gray",
//               }}
//             >
//               <div>Width: {currentDimensions.width}px</div>
//               <div>Height: {currentDimensions.height}px</div>
//             </div>
//           )}
//         </div>
//       </Rnd>
//     );
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div style={{ display: "flex", gap: "16px", height: "100vh" }}>
//         <div
//           style={{
//             width: "200px",
//             border: "2px solid grey",
//             padding: "16px",
//             overflowY: "auto",
//           }}
//         >
//           {[...Array(1).keys()].map((i) => (
//             <DraggableBox
//               key={i}
//               id={`box${i}`}
//               width="100px"
//               height="100px"
//               text=""
//             >
//               Box {i + 1}
//             </DraggableBox>
//           ))}
//           <div>
//             <label>
//               Rows:
//               <input
//                 type="number"
//                 value={rows}
//                 onChange={(e) => {
//                   const newRows = Number(e.target.value);
//                   setRows(newRows);
//                   setRowHeights(Array(newRows).fill(100)); // Reset row heights
//                 }}
//                 min="1"
//               />
//             </label>
//             <label>
//               Columns:
//               <input
//                 type="number"
//                 value={cols}
//                 onChange={(e) => {
//                   const newCols = Number(e.target.value);
//                   setCols(newCols);
//                   setColWidths(Array(newCols).fill(100)); // Reset column widths
//                 }}
//                 min="1"
//               />
//             </label>
//             {Array.from({ length: rows }).map((_, rowIndex) => (
//               <div key={rowIndex}>
//                 <label>
//                   Row {rowIndex + 1} Height:
//                   <input
//                     type="number"
//                     value={rowHeights[rowIndex]}
//                     onChange={(e) => {
//                       const newHeight = Number(e.target.value);
//                       setRowHeights((prevHeights) =>
//                         prevHeights.map((h, i) =>
//                           i === rowIndex ? newHeight : h
//                         )
//                       );
//                     }}
//                     min="1"
//                   />
//                 </label>
//               </div>
//             ))}
//             {Array.from({ length: cols }).map((_, colIndex) => (
//               <div key={colIndex}>
//                 <label>
//                   Column {colIndex + 1} Width:
//                   <input
//                     type="number"
//                     value={colWidths[colIndex]}
//                     onChange={(e) => {
//                       const newWidth = Number(e.target.value);
//                       setColWidths((prevWidths) =>
//                         prevWidths.map((w, i) =>
//                           i === colIndex ? newWidth : w
//                         )
//                       );
//                     }}
//                     min="1"
//                   />
//                 </label>
//               </div>
//             ))}
//           </div>
//         </div>
//         <DroppableArea onDrop={handleDrop}>
//           {droppedItems.map((item, index) => (
//             <ResizableAndDraggableComponent
//               key={index}
//               id={item.id}
//               width={item.width}
//               height={item.height}
//               x={item.x}
//               y={item.y}
//               text={item.text}
//             />
//           ))}
//         </DroppableArea>
//         <div
//           style={{ width: "200px", border: "2px solid grey", padding: "16px" }}
//         >
//           <h3>Selected Box Dimensions</h3>
//           {selectedBox ? (
//             <table>
//               <tbody>
//                 <tr>
//                   <td>Width:</td>
//                   <td>{selectedBox.width}px</td>
//                 </tr>
//                 <tr>
//                   <td>Height:</td>
//                   <td>{selectedBox.height}px</td>
//                 </tr>
//               </tbody>
//             </table>
//           ) : (
//             <p>No box selected</p>
//           )}
//         </div>
//       </div>
//     </DndProvider>
//   );
// };

// export default App;

// using react draggable library
//import React from "react";
// import Draggable from "react-draggable";

// const App = () => {
//   return (
//     <div style={{ width: "100%", height: "100vh", position: "relative" }}>
//       <Draggable>
//         <div style={{ width: 100, height: 100, background: "lightblue", padding: 20 }}>
//           Drag Me!
//         </div>
//       </Draggable>
//     </div>
//   );
// };

// export default App;

//using react-beautiful-dnd not working
// import React, { useState } from 'react';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// const initialItems = [
//   { id: '1', content: 'Item 1', position: { x: 0, y: 0 } },
//   { id: '2', content: 'Item 2', position: { x: 100, y: 0 } },
//   { id: '3', content: 'Item 3', position: { x: 100, y: 0 } },
// ];

// const predefinedPositions = [
//   { x: 0, y: 0 },
//   { x: 100, y: 0 },
//   { x: 100, y: 0 },
//   { x: 0, y: 100 },
//   { x: 100, y: 100 },
//   { x: 100, y: 100 },
//   { x: 0, y: 100 },
//   { x: 100, y: 100 },
//   { x: 100, y: 100 },
// ];

// const getClosestPosition = (x, y) => {
//   let closestPosition = predefinedPositions[0];
//   let closestDistance = Infinity;

//   for (let pos of predefinedPositions) {
//     const distance = Math.hypot(x - pos.x, y - pos.y);
//     if (distance < closestDistance) {
//       closestDistance = distance;
//       closestPosition = pos;
//     }
//   }

//   return closestPosition;
// };

// const App = () => {
//   const [items, setItems] = useState(initialItems);

//   const handleOnDragEnd = (result) => {
//     if (!result.destination) return;

//     const reorderedItems = Array.from(items);
//     const [movedItem] = reorderedItems.splice(result.source.index, 1)[0];
//     const newItem = {
//       ...movedItem,
//       position: getClosestPosition(result.destination.clientOffset.x, result.destination.clientOffset.y),
//     };
//     reorderedItems.splice(result.destination.index, 0, newItem);

//     setItems(reorderedItems);
//   };

//   return (
//     <DragDropContext onDragEnd={handleOnDragEnd}>
//       <Droppable droppableId="droppable">
//         {(provided) => (
//           <div
//             {...provided.droppableProps}
//             ref={provided.innerRef}
//             style={{ position: 'relative', width: '100%', height: '100vh' }}
//           >
//             {items.map((item, index) => (
//               <Draggable key={item.id} draggableId={item.id} index={index}>
//                 {(provided) => (
//                   <div
//                     ref={provided.innerRef}
//                     {...provided.draggableProps}
//                     {...provided.dragHandleProps}
//                     style={{
//                       position: 'absolute',
//                       top: item.position.y,
//                       left: item.position.x,
//                       padding: '8px',
//                       margin: '0 0 8px 0',
//                       backgroundColor: 'lightgrey',
//                       ...provided.draggableProps.style,
//                     }}
//                   >
//                     {item.content}
//                   </div>
//                 )}
//               </Draggable>
//             ))}
//             {provided.placeholder}
//           </div>
//         )}
//       </Droppable>
//     </DragDropContext>
//   );
// };

// export default App;

// import React from 'react';
// import { DndProvider, useDrag, useDrop } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';

// const initialItems = [
//   { id: '1', content: 'Item 1' },
//   { id: '2', content: 'Item 2' },
//   { id: '3', content: 'Item 3' },
// ];

// const ItemType = 'ITEM';

// const DraggableItem = ({ id, content, moveItem }) => {
//   const [, ref] = useDrag({
//     type: ItemType,
//     item: { id },
//   });

//   const [, drop] = useDrop({
//     accept: ItemType,
//     hover: (draggedItem) => {
//       if (draggedItem.id !== id) {
//         moveItem(draggedItem.id, id);
//       }
//     },
//   });

//   return (
//     <div ref={(node) => ref(drop(node))} style={{ padding: '8px', margin: '8px', backgroundColor: 'lightgrey' }}>
//       {content}
//     </div>
//   );
// };

// const App = () => {
//   const [items, setItems] = React.useState(initialItems);

//   const moveItem = (draggedId, hoverId) => {
//     const draggedIndex = items.findIndex((item) => item.id === draggedId);
//     const hoverIndex = items.findIndex((item) => item.id === hoverId);
//     const newItems = [...items];
//     const [draggedItem] = newItems.splice(draggedIndex, 1);
//     newItems.splice(hoverIndex, 0, draggedItem);
//     setItems(newItems);
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div>
//         {items.map((item) => (
//           <DraggableItem key={item.id} id={item.id} content={item.content} moveItem={moveItem} />
// //         ))}
// //       </div>
// //     </DndProvider>
// //   );
// // };

// // export default App;
// import React, { useState } from 'react';
// import Draggable from 'react-draggable';

// const initialItems = [
//   { id: '1', content: 'Item 1', position: { x: 0, y: 0 } },
//   { id: '2', content: 'Item 2', position: { x: 0, y: 50 } },
//   { id: '3', content: 'Item 3', position: { x: 0, y: 100 } },
// ];

// const App = () => {
//   const [items, setItems] = useState(initialItems);

//   const handleStop = (e, data, id) => {
//     const newItems = items.map(item => {
//       if (item.id === id) {
//         return { ...item, position: { x: data.x, y: data.y } };
//       }
//       return item;
//     });
//     setItems(newItems);
//   };

//   return (
//     <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
//       {items.map((item) => (
//         <Draggable
//           key={item.id}
//           defaultPosition={{ x: item.position.x, y: item.position.y }}
//           onStop={(e, data) => handleStop(e, data, item.id)}
//         >
//           <div
//             style={{
//               padding: '8px',
//               margin: '8px',
//               backgroundColor: 'lightgrey',
//               position: 'absolute',
//             }}
//           >
//             {item.content}
//           </div>
//         </Draggable>
//       ))}
//     </div>
//   );
// };

// export default App;
// import React, { useState } from 'react';
// import { useSpring, animated } from 'react-spring';
// import { useDrag } from 'react-use-gesture';

// const DraggableItem = ({ content, style }) => {
//   const [props, set] = useSpring(() => style);

//   const bind = useDrag(({ offset: [x, y] }) => {
//     set({ x, y });
//   });

//   return (
//     <animated.div
//       {...bind()}
//       style={{
//         ...props,
//         position: 'absolute',
//         padding: '8px',
//         backgroundColor: 'lightgrey',
//         cursor: 'move',
//       }}
//     >
//       {content}
//     </animated.div>
//   );
// };

// const App = () => {
//   const [items] = useState([
//     { id: '1', content: 'Item 1', x: 50, y: 50 },
//     { id: '2', content: 'Item 2', x: 150, y: 50 },
//     { id: '3', content: 'Item 3', x: 250, y: 50 },
//   ]);

//   return (
//     <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
//       {items.map((item) => (
//         <DraggableItem
//           key={item.id}
//           content={item.content}
//           style={{ x: item.x, y: item.y }}
//         />
//       ))}
//     </div>
//   );
// };

// export default App;

// import React, { useState } from "react";
// import Draggable from "react-draggable";
// import "./App.css";

// const initialData = [
//   { id: "item-1", content: "Item 1" },
//   { id: "item-2", content: "Item 2" },
//   { id: "item-3", content: "Item 3" },
//   { id: "item-4", content: "Item 4" },
//   { id: "item-5", content: "Item 5" },
//   { id: "item-6", content: "Item 6" },
//   { id: "item-7", content: "Item 7" },
//   { id: "item-8", content: "Item 8" },
//   { id: "item-9", content: "Item 9" },
// ];

// const grid = 8;

// const App = () => {
//   const [items, setItems] = useState(initialData);

//   return (
//     <div className="main_content" style={{ position: "relative", height: "100vh" }}>
//       {items.map((item) => (
//         <DraggableResizable key={item.id}>
//           <div className="card">
//             {item.content}
//           </div>
//         </DraggableResizable>
//       ))}
//     </div>
//   );
// };

// const DraggableResizable = ({ children }) => {
//   const [size, setSize] = useState({ width: 100, height: 100 }); // Initial size

//   const handleDrag = (e, ui) => {
//     // Update size based on drag movement
//     setSize({
//       width: size.width + ui.deltaX,
//       height: size.height + ui.deltaY
//     });
//   };

//   return (
//     <Draggable onDrag={handleDrag}>
//       <div className="resizable-box" style={{ width: size.width, height: size.height }}>
//         {children}
//       </div>
//     </Draggable>
//   );
// };

// export default App;




















import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Rnd } from "react-rnd";

const App = () => {
  const [droppedItems, setDroppedItems] = useState([]);
  const [selectedBox, setSelectedBox] = useState(null);
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [rowHeights, setRowHeights] = useState(Array(3).fill(100));
  const [colWidths, setColWidths] = useState(Array(3).fill(100));
  const [boxTexts, setBoxTexts] = useState({});
  const [fontSize, setFontSize] = useState(16);
  const [activeBoxFontSize, setActiveBoxFontSize] = useState(16);
  const [activeBoxColor, setActiveBoxColor] = useState("");
  const [activeFontColor, setActiveFontColor] = useState("#000000");
  const [borderRadius, setBorderRadius] = useState(0);
  const [borderColor, setBorderColor] = useState("#000000");
  const [borderWidth, setBorderWidth] = useState(1);

  const handleDrop = (item, monitor) => {
    const delta = monitor.getClientOffset();
    const dropPosition = {
      x: delta.x - 200,
      y: delta.y - 16,
    };
    const id = `${item.id}-${droppedItems.length}`;
    setDroppedItems((prevItems) => [
      ...prevItems,
      {
        ...item,
        ...dropPosition,
        id: id,
        width: item.width,
        height: item.height,
        fontSize: fontSize,
        backgroundColor: "#ffffff",
        fontColor: "#000000",
        borderRadius: borderRadius,
        borderColor: borderColor,
        borderWidth: borderWidth,
      },
    ]);
    setBoxTexts((prevTexts) => ({ ...prevTexts, [id]: item.text || "" }));
  };

  const DraggableBox = ({ id, width, height, text }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "BOX",
      item: { id, width, height, text },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }));

    return (
      <div
        ref={drag}
        style={{
          width,
          height,
          opacity: isDragging ? 0.5 : 1,
          cursor: "move",
          background: "white",
          border: "2px dashed blue",
          marginBottom: "8px",
          position: "relative",
          fontSize: `${fontSize}px`,
        }}
      >
        Box
      </div>
    );
  };

  const DroppableArea = ({ onDrop, children }) => {
    const [{ isOver }, drop] = useDrop(() => ({
      accept: "BOX",
      drop: (item, monitor) => {
        onDrop(item, monitor);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }));

    const gridStyle = {
      display: "grid",
      gridTemplateRows: rowHeights.map((h) => `${h}px`).join(" "),
      gridTemplateColumns: colWidths.map((w) => `${w}px`).join(" "),
      width: "100%",
      height: "100%",
      position: "relative",
      border: "2px solid black",
    };

    return (
      <div ref={drop} style={gridStyle}>
        {children}
      </div>
    );
  };

  const ResizableAndDraggableComponent = ({
    id,
    width,
    height,
    x,
    y,
    fontSize,
    backgroundColor,
    fontColor,
    borderRadius,
    borderColor,
    borderWidth,
  }) => {
    const [dimensions, setDimensions] = useState({ width, height });
    const [position, setPosition] = useState({ x, y });
    const [currentDimensions, setCurrentDimensions] = useState(null);
    const isActiveBox = selectedBox === id;

    const handleDoubleClick = () => {
      setSelectedBox(id);
      setActiveBoxFontSize(fontSize);
      setActiveBoxColor(backgroundColor);
      setActiveFontColor(fontColor);
      setBorderRadius(borderRadius);
      setBorderColor(borderColor);
      setBorderWidth(borderWidth);
    };

    const handleResizeStop = (e, direction, ref, delta, position) => {
      const newDimensions = {
        width: ref.offsetWidth,
        height: ref.offsetHeight,
      };
      setDimensions(newDimensions);
      setPosition(position);
      setDroppedItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id
            ? {
                ...item,
                width: newDimensions.width,
                height: newDimensions.height,
                x: position.x,
                y: position.y,
              }
            : item
        )
      );
      setSelectedBox(id);
      setCurrentDimensions(null);
    };

    const handleClick = () => {
      setSelectedBox(id);
      setActiveBoxFontSize(fontSize);
      setActiveBoxColor(backgroundColor);
      setActiveFontColor(fontColor);
      setBorderRadius(borderRadius);
      setBorderColor(borderColor);
      setBorderWidth(borderWidth);
    };

    const handleTextChange = (e) => {
      const newText = e.target.value;
      setBoxTexts((prevTexts) => ({ ...prevTexts, [id]: newText }));
      setDroppedItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, text: newText } : item
        )
      );
    };

    return (
      <Rnd
        size={{ width: dimensions.width, height: dimensions.height }}
        position={{ x: position.x, y: position.y }}
        minWidth={10}
        minHeight={10}
        onDragStop={(e, d) => {
          setPosition({ x: d.x, y: d.y });
          setDroppedItems((prevItems) =>
            prevItems.map((item) =>
              item.id === id ? { ...item, x: d.x, y: d.y } : item
            )
          );
        }}
        onResize={(e, direction, ref, delta, position) => {
          const newDimensions = {
            width: ref.offsetWidth,
            height: ref.offsetHeight,
          };
          setCurrentDimensions(newDimensions);
        }}
        onResizeStop={handleResizeStop}
        onDoubleClick={handleDoubleClick}
        onClick={handleClick}
        style={{
          border: `${borderWidth}px solid ${borderColor}`,
          backgroundColor: backgroundColor,
          borderRadius: `${borderRadius}px`,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            fontSize: `${fontSize}px`,
            color: fontColor,
            backgroundColor: backgroundColor,
            borderRadius: `${borderRadius}px`,
          }}
        >
          {isActiveBox ? (
            <input
              value={boxTexts[id] || ""}
              onChange={handleTextChange}
              autoFocus={true}
              style={{
                width: "100%",
                height: "100%",
                color: fontColor,
                border: "none",
                outline: "none",
                boxSizing: "border-box",
                padding: "4px",
                fontSize: `${fontSize}px`,
                backgroundColor: backgroundColor,
                borderRadius: `${borderRadius}px`,
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                padding: "4px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontSize: `${fontSize}px`,
                color: fontColor,
                borderRadius: `${borderRadius}px`,
              }}
            >
              {boxTexts[id] || ""}
            </div>
          )}
          {currentDimensions && (
            <div
              style={{
                position: "absolute",
                top: "0",
                right: "-120px",
                background: "lightgray",
                padding: "5px",
                border: "1px solid gray",
                fontSize: "15px",
              }}
            >
              <div>Width: {currentDimensions.width}px</div>
              <div>Height: {currentDimensions.height}px</div>
            </div>
          )}
        </div>
      </Rnd>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: "flex", gap: "16px", height: "100vh" }}>
        <div
          style={{
            width: "200px",
            border: "2px solid grey",
            padding: "16px",
            overflowY: "auto",
          }}
        >
          <label>
            Font Size:
            <input
              type="number"
              value={fontSize}
              onChange={(e) => {
                const newFontSize = Number(e.target.value);
                setFontSize(newFontSize);
                if (selectedBox) {
                  setActiveBoxFontSize(newFontSize);
                  setDroppedItems((prevItems) =>
                    prevItems.map((item) =>
                      item.id === selectedBox
                        ? { ...item, fontSize: newFontSize }
                        : item
                    )
                  );
                }
              }}
              min="8"
            />
          </label>
          <label>
            Background Color:
            <input
              type="color"
              value={activeBoxColor}
              onChange={(e) => {
                const newColor = e.target.value;
                setActiveBoxColor(newColor);
                if (selectedBox) {
                  setDroppedItems((prevItems) =>
                    prevItems.map((item) =>
                      item.id === selectedBox
                        ? { ...item, backgroundColor: newColor }
                        : item
                    )
                  );
                }
              }}
            />
          </label>
          <label>
            Font Color:
            <input
              type="color"
              value={activeFontColor}
              onChange={(e) => {
                const newFontColor = e.target.value;
                setActiveFontColor(newFontColor);
                if (selectedBox) {
                  setDroppedItems((prevItems) =>
                    prevItems.map((item) =>
                      item.id === selectedBox
                        ? { ...item, fontColor: newFontColor }
                        : item
                    )
                  );
                }
              }}
            />
          </label>
          <label>
            Border Radius (px):
            <input
              type="number"
              value={borderRadius}
              onChange={(e) => {
                const newBorderRadius = Number(e.target.value);
                setBorderRadius(newBorderRadius);
                if (selectedBox) {
                  setDroppedItems((prevItems) =>
                    prevItems.map((item) =>
                      item.id === selectedBox
                        ? { ...item, borderRadius: newBorderRadius }
                        : item
                    )
                  );
                }
              }}
              min="0"
            />
          </label>
          <label>
            Border Color:
            <input
              type="color"
              value={borderColor}
              onChange={(e) => {
                const newBorderColor = e.target.value;
                setBorderColor(newBorderColor);
                if (selectedBox) {
                  setDroppedItems((prevItems) =>
                    prevItems.map((item) =>
                      item.id === selectedBox
                        ? { ...item, borderColor: newBorderColor }
                        : item
                    )
                  );
                }
              }}
            />
          </label>
          <label>
            Border Width (px):
            <input
              type="number"
              value={borderWidth}
              onChange={(e) => {
                const newBorderWidth = Number(e.target.value);
                setBorderWidth(newBorderWidth);
                if (selectedBox) {
                  setDroppedItems((prevItems) =>
                    prevItems.map((item) =>
                      item.id === selectedBox
                        ? { ...item, borderWidth: newBorderWidth }
                        : item
                    )
                  );
                }
              }}
              min="0"
            />
          </label>
          <DraggableBox id="box1" width={100} height={100} text="Box 1" />
          <DraggableBox id="box2" width={100} height={100} text="Box 2" />
          <DraggableBox id="box3" width={100} height={100} text="Box 3" />
        </div>
        <div style={{ flex: 1, position: "relative" }}>
          <DroppableArea onDrop={handleDrop}>
            {droppedItems.map((item) => (
              <ResizableAndDraggableComponent
                key={item.id}
                id={item.id}
                width={item.width}
                height={item.height}
                x={item.x}
                y={item.y}
                fontSize={item.fontSize}
                backgroundColor={item.backgroundColor}
                fontColor={item.fontColor}
                borderRadius={item.borderRadius}
                borderColor={item.borderColor}
                borderWidth={item.borderWidth}
              />
            ))}
          </DroppableArea>
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
