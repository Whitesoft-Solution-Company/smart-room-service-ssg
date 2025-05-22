
export default async (request, context) => {
  const url = new URL(request.url);

  const token = url.searchParams.get("token");
  const authToken = context.cookies.get("authToken");
  const tokenVerified = token || authToken;
  if (!tokenVerified) {
    return Response.redirect("/401", 302);
  }

  // Verify token with Strapi
  const userRes = await fetch(`https://service.ananyalipe.com/api/hotels/${tokenVerified}`);
  const userData = await userRes.json(); // Convert response to JSON
   
  // Check if token verification is valid
  if (!userRes.ok || userData.data === null) {
      context.cookies.set({
        name: "authToken",
        value: "",
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 1 // 1 day
      });
      return Response.redirect("/401", 302);
  }

  // Set the cookie with the token
  if(token && token !== authToken) {
    context.cookies.set({
      name: "authToken",
      value: tokenVerified,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });
  }

  if (url.searchParams.get("token")) {
    return Response.redirect("/protected/en/home", 302); // Redirect to homepage with status 302
  }

  return context.next(); // Continue with the request
  };