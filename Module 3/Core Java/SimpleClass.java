public class SimpleClass {
    public int add(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        SimpleClass obj = new SimpleClass();
        int sum = obj.add(5, 10);
        System.out.println("Sum = " + sum);
    }
}
