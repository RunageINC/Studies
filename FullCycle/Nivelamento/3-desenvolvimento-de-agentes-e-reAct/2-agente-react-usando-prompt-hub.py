from langchain.tools import tool
from langchain_openai import ChatOpenAI
from langchain.agents import create_agent
from langchain_classic.agents import AgentExecutor, create_react_agent
from langchain_core.prompts import PromptTemplate
from langsmith import hub
from dotenv import load_dotenv
load_dotenv()

@tool("calculator", return_direct=True)
def calculator(expression: str) -> str:
    """Evaluate a simple mathematical expression and return the result."""
    try:
        result = eval(expression) # security risk since we're executing anything here in the expression
    except Exception as e:
        return f"Error: {e}"
    return str(result)

@tool("web_search_mock")
def web_search_mock(query: str) -> str:
    """Mocked web search tool. Returns a hardocded static result."""
    
    data = {"Brazil": "Brasilia", "Argentina": "Buenos Aires", "Chile": "Santiago", "Peru": "Lima", "Colombia": "Bogota", "Venezuela": "Caracas", "Ecuador": "Quito", "Bolivia": "La Paz", "Paraguay": "Asuncion", "Uruguay": "Montevideo", "Chile": "Santiago", "Peru": "Lima", "Colombia": "Bogota", "Venezuela": "Caracas", "Ecuador": "Quito", "Bolivia": "La Paz", "Paraguay": "Asuncion", "Uruguay": "Montevideo"}

    for country, capital in data.items():
        if country.lower() in query.lower():
            return f"The capital of {country} is {capital}."

    return "I don't know the capital of that country."


llm = ChatOpenAI(model="gpt-5-mini", disable_streaming=True)
tools = [calculator, web_search_mock]
# tool_names = [tool.name for tool in tools]
# agent_scratchpad = ""

prompt = hub.pull("hwchase17/react")

agent_chain = create_react_agent(llm, tools, prompt, stop_sequence=False)

agent_executor = AgentExecutor.from_agent_and_tools(
    agent=agent_chain, 
    tools=tools, 
    verbose=True, 
    handle_parsing_errors="Invalid format. Either provide an Action with Action Input, or a Final Answer only.",
    max_iterations=3)

print(agent_executor.invoke({"input": "What is the capital of Brazil?"}))
print(agent_executor.invoke({"input": "What is the capital of Iran?"}))
print(agent_executor.invoke({"input": "What is 10 + 10?"}))