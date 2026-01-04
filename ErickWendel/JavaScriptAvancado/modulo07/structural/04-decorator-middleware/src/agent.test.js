import { expect, describe, test, jest, beforeEach } from "@jest/globals";

import { InjectHttpInterceptor } from "./agent.js";
import { Server } from "http";

const originalHttp = jest.createMockFromModule("http");

describe("HTTP Interceptor Agent", () => {
  const eventName = "request";
  const request = null;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should not change headers", () => {
    const responseMock = {
      setHeader: jest.fn().mockReturnThis(),
    };

    const serverInstance = new originalHttp.Server();

    serverInstance.emit(eventName, request, responseMock);

    expect(responseMock.setHeader).not.toHaveBeenCalled();
  });
  test("should activate header interceptor", () => {
    InjectHttpInterceptor();

    const responseMock = {
      setHeader: jest.fn().mockReturnThis(),
    };

    const serverInstance = new Server();

    serverInstance.emit(eventName, request, responseMock);

    expect(responseMock.setHeader).toHaveBeenCalledWith(
      "X-Instrumented-By",
      "Arthur Gomes"
    );
  });
});
