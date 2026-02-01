
```sql
select
  case_id as "caseId",
  json_agg(
    json_build_object(
      'id', id,
      'event', event,
      'actorId', actor_id,
      'createdAt', created_at,
      'description', event_description
    )
    order by created_at desc
  ) as events
from edd_events
where case_id in (
  'usrsk-g3kmveyguaj30gbyygeo7v9q',
  'usrsk-c219z7zjh0sg2tns088sdp0b'
)
group by case_id;
```
