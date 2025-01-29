

const UrlInput = ({ handleSubmit, inputFieldData, setInputFieldData }) => {

    const onFormSubmit = (event) => {
        event.preventDefault();
        handleSubmit(event);

    };
     
    return (
        <div> 
          <div>UrlInput - child of App</div>
          <form onSubmit={onFormSubmit}>
            <input
             type="text"
             value={inputFieldData}
             onChange={(event) => setInputFieldData(event.target.value)}
            />
             <button type="submit">Submit</button>
             
          </form>
        </div>
     );

};

export default UrlInput;