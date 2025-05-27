import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class HttpClientExample {
    public static void main(String[] args) {
        try {
            // Create HttpClient
            HttpClient client = HttpClient.newHttpClient();

            // Create HttpRequest to GitHub API
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(new URI("https://api.github.com/repos/openai/gpt-3"))
                    .GET()
                    .build();

            // Send request and get response
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            // Print status code
            System.out.println("Status Code: " + response.statusCode());

            // Print response body
            System.out.println("Response Body:");
            System.out.println(response.body());

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
