import dotenv from "dotenv";

dotenv.config();

const defaultParameters = {
    clean_up_tokenization_spaces: true,
    truncation: "longest_first",
    generate_parameters: {

    }
};

export async function query(data, parameters = defaultParameters) {
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
            {
                headers: {
                    Authorization: "Bearer " + process.env.HUGGING_FACE_API,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ 
					inputs: data, 
				}),
            }
        );
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}
