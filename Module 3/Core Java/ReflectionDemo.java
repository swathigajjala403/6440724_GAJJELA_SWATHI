import java.lang.reflect.*;

public class ReflectionDemo {

    // Nested Person class
    public static class Person {
        private String name;

        public Person() {
            this.name = "Unknown";
        }

        public Person(String name) {
            this.name = name;
        }

        public void greet() {
            System.out.println("Hello, my name is " + name);
        }

        public void greetPerson(String greeting) {
            System.out.println(greeting + ", " + name);
        }
    }

    public static void main(String[] args) {
        try {
            // Load the nested Person class dynamically using $ separator
            Class<?> cls = Class.forName("ReflectionDemo$Person");

            // Print all declared methods with their parameter types
            Method[] methods = cls.getDeclaredMethods();
            System.out.println("Methods in " + cls.getName() + ":");
            for (Method method : methods) {
                System.out.print(" - " + method.getName() + "(");
                Class<?>[] params = method.getParameterTypes();
                for (int i = 0; i < params.length; i++) {
                    System.out.print(params[i].getSimpleName());
                    if (i < params.length - 1) System.out.print(", ");
                }
                System.out.println(")");
            }

            // Create an instance using the no-arg constructor
            Object obj = cls.getDeclaredConstructor().newInstance();

            // Invoke greet() method dynamically
            Method greetMethod = cls.getDeclaredMethod("greet");
            greetMethod.invoke(obj);

            // Invoke greetPerson(String) method dynamically
            Method greetPersonMethod = cls.getDeclaredMethod("greetPerson", String.class);
            greetPersonMethod.invoke(obj, "Good morning");

        } catch (ClassNotFoundException | NoSuchMethodException |
                 InstantiationException | IllegalAccessException |
                 InvocationTargetException e) {
            e.printStackTrace();
        }
    }
}
