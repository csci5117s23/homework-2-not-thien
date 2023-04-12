function ToDoItemPage({ id, text }) {
    return (
      <div>
        <h1>here is where the text would go</h1>
        <p>ID: this is where the id would go</p>
      </div>
    );
  }
  
//   export async function getServerSideProps(context) {
//     const { id } = context.query;
//     const response = await fetch(`https://your-codehooks-io-endpoint-url.com/todos/${id}`);
//     const data = await response.json();
//     return {
//       props: {
//         id: data.id,
//         text: data.text,
//       },
//     };
//   }
  
  export default ToDoItemPage;
  