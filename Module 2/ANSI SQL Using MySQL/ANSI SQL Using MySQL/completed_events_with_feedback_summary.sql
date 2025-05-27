-- Completed events with registration and rating stats
SELECT 
    e.title,
    COUNT(DISTINCT r.registration_id) AS registrations,
    AVG(f.rating) AS avg_rating
FROM 
    Events e
LEFT JOIN 
    Registrations r ON e.event_id = r.event_id
LEFT JOIN 
    Feedback f ON e.event_id = f.event_id
WHERE 
    e.status = 'completed'
GROUP BY 
    e.event_id, e.title;