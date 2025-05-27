public class PatternMatchingSwitchDemo {

    public static void checkObjectType(Object obj) {
        String result = switch (obj) {
            case Integer i -> "It's an Integer with value: " + i;
            case String s -> "It's a String with value: " + s;
            case Double d -> "It's a Double with value: " + d;
            case null -> "It's null";
            default -> "Unknown type: " + obj.getClass().getSimpleName();
        };

        System.out.println(result);
    }

    public static void main(String[] args) {
        checkObjectType(123);
        checkObjectType("Hello World");
        checkObjectType(3.14);
        checkObjectType(true);   // Boolean, will go to default
        checkObjectType(null);
    }
}
