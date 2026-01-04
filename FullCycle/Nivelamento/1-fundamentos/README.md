Uma das facilidades de se trabalhar com IA's em Python se da ao tanto de libs que a linguagem possui para trabalhar com modelos e com templates, que facilitam os trabalhos.

Esses templates podem ser vistos e configurados através da lib langchain_core.prompts

Eles servem para auxiliar na dinamicidade dos prompts, garantindo replacements nos textos que enviaremos aos modelos:

```python
system = ("system", "You are an assistant that answers questions in a {style} style.")
user = ("user", "{question}")

chat_prompt = ChatPromptTemplate([system, user])

messages = chat_prompt.format_messages(
    style = "funny",
    question = "Who is Alan Turing?"
)

model = ChatOpenAI(model="gpt-5-mini", temperature=0.5)
result = model.invoke(messages)
```
