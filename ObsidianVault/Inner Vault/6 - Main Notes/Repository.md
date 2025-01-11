The repository pattern is


### On Spring

On the [[Spring]] framework, there are a few repositories for common JPA:

![[Repository Explanation.png]]

From bottom-up, every implementation has the same things from the other implementation, being the Repository the most crude of them all, and the JPA being the highest implementation, with paging and all the stuff. It means that the lowest the repository, the worst is for performance, which can be reviewed in specific cases. But mostly, the performance hinderance can be overlooked for better commodity of using **JpaRepository**.

