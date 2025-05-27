-- Users registered each day (last 7 days)
SELECT 
    registration_date,
    COUNT(user_id) AS new_users
FROM 
    Users
WHERE 
    registration_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
GROUP BY 
    registration_date
ORDER BY 
    registration_date DESC;