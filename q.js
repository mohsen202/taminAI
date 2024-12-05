import { Client } from "@gradio/client";

const client = await Client.connect("https://71bf507d2731ca29d7.gradio.live/");
const result = await client.predict("/predict", { 		
		input_text: "Hello!!", 
});

console.log(result.data);
