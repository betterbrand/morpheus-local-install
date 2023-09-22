
async function query(data) {
    const response = await fetch(
        "http://localhost:3000/api/v1/prediction/7e8c3762-54a5-48f5-8143-0067ab957113",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );
    const result = await response.json();
    return result;
}

query({"question": "Hey, how are you?"}).then((response) => {
    console.log(response);
});