
export default async (request, context) => {
  const url = new URL(request.url);

  const queryToken = url.searchParams.get("token");
  const cookieToken = context.cookies.get("authToken")?.value;
  const token = queryToken || cookieToken;
  if (!token) {
    return Response.redirect("/401", 302);
  }

  // Verify token with Strapi
  const userRes = await fetch(`https://service.ananyalipe.com/api/hotels/${token}`);
  const userData = await userRes.json(); // Convert response to JSON

  // Check if token verification is valid
  if (!userRes.ok || userData?.data == null) {
      context.cookies.set({
        name: "authToken",
        value: "",
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 1
      });
      return Response.redirect("/401", 302);
  }

  if (queryToken && queryToken !== cookieToken) {
      context.cookies.set({
        name: "authToken",
        value: queryToken,
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7
      });
  }
  

  if (url.searchParams.get("token")) {
    return Response.redirect("/protected/en/home", 302); // Redirect to homepage with status 302
  }

  return context.next(); // Continue with the request
  };