from langchain_core.prompts import PromptTemplate

template = PromptTemplate(
    input_variables=["name"],
    template="Hi, I am {name}! Tell me a joke with my name!"
)

text = template.format(name="Arthur")

print(text)